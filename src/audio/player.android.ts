import { Application, EventData, Observable, Utils } from '@nativescript/core';
import { SDK_VERSION } from '@nativescript/core/utils';
import { AudioPlayerEvents, resolveAudioFilePath } from './common';
import { AudioPlayerOptions } from '.';

export enum AudioFocusDurationHint {
    AUDIOFOCUS_GAIN = android.media.AudioManager.AUDIOFOCUS_GAIN,
    AUDIOFOCUS_GAIN_TRANSIENT = android.media.AudioManager.AUDIOFOCUS_GAIN_TRANSIENT,
    AUDIOFOCUS_GAIN_TRANSIENT_MAY_DUCK = android.media.AudioManager.AUDIOFOCUS_GAIN_TRANSIENT_MAY_DUCK,
    AUDIOFOCUS_GAIN_TRANSIENT_EXCLUSIVE = android.media.AudioManager.AUDIOFOCUS_GAIN_TRANSIENT_EXCLUSIVE
}

const defaultAudioFocusManagerOptions: AudioFocusManagerOptions = {
    durationHint: AudioFocusDurationHint.AUDIOFOCUS_GAIN,
    usage: android.media.AudioAttributes.USAGE_MEDIA,
    contentType: android.media.AudioAttributes.CONTENT_TYPE_MUSIC
};

export interface AudioFocusManagerOptions {
    durationHint?: AudioFocusDurationHint;
    usage?: number; // android.media.AudioAttributes.USAGE_MEDIA
    contentType?: number; // android.media.AudioAttributes.CONTENT_TYPE_MUSIC
}
export interface AudioFocusChangeEventData extends EventData {
    focusChange: number;
}

export class AudioFocusManager extends Observable {
    private _audioFocusRequest: android.media.AudioFocusRequest;
    private _mAudioFocusGranted: boolean = false;
    private _durationHint: AudioFocusDurationHint;
    private _audioPlayerSet = new Set<TNSPlayer>();
    private _mOnAudioFocusChangeListener: android.media.AudioManager.OnAudioFocusChangeListener;

    constructor(options?: AudioFocusManagerOptions) {
        super();
        options = { ...defaultAudioFocusManagerOptions, ...(options || {}) };
        this._durationHint = options.durationHint;
        if (SDK_VERSION < 26) {
            return;
        }
        // Request audio focus for play back

        const playbackAttributes = new android.media.AudioAttributes.Builder().setUsage(options.usage).setContentType(options.contentType).build();
        const that = new WeakRef(this);
        this._mOnAudioFocusChangeListener = new android.media.AudioManager.OnAudioFocusChangeListener({
            onAudioFocusChange: (focusChange: number) => {
                that?.get()?.notify({
                    eventName: 'audioFocusChange',
                    object: this,
                    focusChange
                });
            }
        });
        this._audioFocusRequest = new android.media.AudioFocusRequest.Builder(options.durationHint)
            .setAudioAttributes(playbackAttributes)
            .setAcceptsDelayedFocusGain(true)
            .setOnAudioFocusChangeListener(this._mOnAudioFocusChangeListener)
            .build();
    }

    private needsFocus(): boolean {
        return this._audioPlayerSet.size > 0;
    }
    /**
     *
     * @param owner player requesting focus
     * @returns if we have focus or not
     */
    requestAudioFocus(owner: TNSPlayer): boolean {
        // If it does not enter the condition block, means that we already
        // have focus. Therefore we have to start with `true`.
        let result = true;
        let focusResult = null;
        if (!this._mAudioFocusGranted) {
            const ctx = Utils.android.getApplicationContext();
            const am = ctx.getSystemService(android.content.Context.AUDIO_SERVICE) as android.media.AudioManager;

            // Request audio focus for play back
            if (SDK_VERSION >= 26) {
                focusResult = am.requestAudioFocus(this._audioFocusRequest);
            } else {
                focusResult = am.requestAudioFocus(this._mOnAudioFocusChangeListener, android.media.AudioManager.STREAM_MUSIC, this._durationHint);
            }

            if (focusResult === android.media.AudioManager.AUDIOFOCUS_REQUEST_GRANTED) {
                result = true;
            } else {
                result = false;
            }
        }

        this._audioPlayerSet.add(owner);
        this._mAudioFocusGranted = result;

        return result;
    }
    /**
     * Abandons the audio focus for this player
     * Audio focus request will not be made unless owner has previously requested focus or is null
     * @param owner either a player or null if you want to manually release the audio focus
     * @returns if we still have audio focus or not
     */
    abandonAudioFocus(owner: TNSPlayer | null): boolean {
        if (owner) {
            if (!this._audioPlayerSet.has(owner)) {
                return this._mAudioFocusGranted;
            }
            this._audioPlayerSet.delete(owner);
        }
        if (this.needsFocus() || !this._mAudioFocusGranted) {
            return this._mAudioFocusGranted;
        }
        const ctx = Utils.android.getApplicationContext();
        const am = ctx.getSystemService(android.content.Context.AUDIO_SERVICE);
        let result = null;

        if (SDK_VERSION >= 26) {
            result = am.abandonAudioFocusRequest(this._audioFocusRequest);

            // this._audioFocusRequest = null;
        } else {
            result = am.abandonAudioFocus(this._mOnAudioFocusChangeListener);
        }
        if (result === android.media.AudioManager.AUDIOFOCUS_REQUEST_GRANTED) {
            this._mAudioFocusGranted = false;
        } else {
            console.error('Failed to abandon audio focus.');
        }
        return this._mAudioFocusGranted;
    }
}

let globalMixingManager: AudioFocusManager | null;

function getGlobalMixingManager(): AudioFocusManager {
    if (!globalMixingManager) {
        globalMixingManager = new AudioFocusManager();
    }
    return globalMixingManager;
}

export class TNSPlayer extends Observable {
    private _mediaPlayer: android.media.MediaPlayer;
    private _lastPlayerVolume; // ref to the last volume setting so we can reset after ducking
    private _wasPlaying = false;
    private _options: AudioPlayerOptions;
    private _audioFocusManager: AudioFocusManager | null;

    constructor(durationHint: AudioFocusDurationHint | AudioFocusManager = AudioFocusDurationHint.AUDIOFOCUS_GAIN) {
        super();
        if (!(durationHint instanceof AudioFocusManager)) {
            this.setAudioFocusManager(
                new AudioFocusManager({
                    durationHint
                })
            );
        } else {
            this.setAudioFocusManager(durationHint);
        }
    }

    get android(): any {
        return this._player;
    }

    get volume(): number {
        // TODO: find better way to get individual player volume
        const ctx = Utils.android.getApplicationContext();
        const mgr = ctx.getSystemService(android.content.Context.AUDIO_SERVICE);
        return mgr.getStreamVolume(android.media.AudioManager.STREAM_MUSIC);
    }

    set volume(value: number) {
        if (value >= 0) {
            this._player?.setVolume(value, value);
        }
    }

    public get duration(): number {
        return this._player?.getDuration() ?? 0;
    }

    get currentTime(): number {
        return this._player?.getCurrentPosition() ?? 0;
    }

    public setAudioFocusManager(manager: AudioFocusManager) {
        if (manager === this._audioFocusManager) {
            return;
        }
        this._audioFocusManager?.off('audioFocusChange', this._onAudioFocusChange, this);
        this._audioFocusManager?.abandonAudioFocus(this);
        this._audioFocusManager = manager;
        this._audioFocusManager?.on('audioFocusChange', this._onAudioFocusChange, this);
    }

    /**
     * Initializes the player with options, will not start playing audio.
     * @param options [AudioPlayerOptions]
     */
    public initFromFile(options: AudioPlayerOptions): Promise<any> {
        return new Promise((resolve, reject) => {
            options.autoPlay = false;
            this.playFromFile(options).then(resolve, reject);
        });
    }

    public playFromFile(options: AudioPlayerOptions): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                this._options = options;
                if (options.autoPlay !== false) {
                    options.autoPlay = true;
                }
                const player = this._player;
                if (SDK_VERSION < 26) {
                    player.setAudioStreamType(options.audioStreamType ?? android.media.AudioManager.STREAM_MUSIC);
                }
                player.reset();
                if (options.audioFile) {
                    const audioPath = resolveAudioFilePath(options.audioFile);
                    if (audioPath.startsWith('content://')) {
                        player.setDataSource(Utils.android.getApplicationContext(), android.net.Uri.parse(audioPath));
                    } else {
                        player.setDataSource(audioPath);
                    }

                    // check if local file or remote - local then `prepare` is okay https://developer.android.com/reference/android/media/MediaPlayer.html#prepare()
                    if (Utils.isFileOrResourcePath(audioPath)) {
                        player.prepare();
                    } else {
                        player.prepareAsync();
                    }
                } else if (options.dataSource) {
                    player.setDataSource(options.dataSource);
                    player.prepareAsync();
                }

                // On Info
                if (options.infoCallback) {
                    player.setOnInfoListener(
                        new android.media.MediaPlayer.OnInfoListener({
                            onInfo: (player: android.media.MediaPlayer, info: number, extra: number) => {
                                options.infoCallback({ player, info, extra });
                                return true;
                            }
                        })
                    );
                }

                // On Prepared
                player.setOnPreparedListener(
                    new android.media.MediaPlayer.OnPreparedListener({
                        onPrepared: (mp) => {
                            try {
                                if (options.seek) {
                                    this.seekTo(options.seek);
                                }
                                if (options.autoPlay) {
                                    this.play();
                                }
                                resolve(null);
                            } catch (error) {
                                reject(error);
                            }
                        }
                    })
                );
            } catch (ex) {
                this._abandonAudioFocus();
                reject(ex);
            }
        });
    }

    /**
     * Initializes the player with options, will not start playing audio.
     * @param options
     */
    public initFromUrl(options: AudioPlayerOptions) {
        options.autoPlay = false;
        return this.playFromUrl(options);
    }

    public async playFromUrl(options: AudioPlayerOptions) {
        return this.playFromFile(options);
    }

    public async pause() {
        if (this._player && this._player.isPlaying()) {
            this._player.pause();
            // We abandon the audio focus but we still preserve
            // the MediaPlayer so we can resume it in the future
            this._abandonAudioFocus(true);
            this.notify({ eventName: AudioPlayerEvents.paused });
        }
    }
    public async stop() {
        if (this._player && this._player.isPlaying()) {
            this._player.stop();
            // We abandon the audio focus but we still preserve
            // the MediaPlayer so we can resume it in the future
            this._abandonAudioFocus(true);
            this.notify({ eventName: AudioPlayerEvents.stopped });
        }
    }

    public async play() {
        const player = this._player;
        if (player && !player.isPlaying()) {
            // request audio focus, this will setup the onAudioFocusChangeListener
            if (this._options.audioMixing) {
                // we're mixing audio, so we use a global mixing manager
                // all players need to set this to true if they're supporting mixing
                this.setAudioFocusManager(getGlobalMixingManager());
                // TODO: maybe reset to a default audio manager?
            }
            const audioFocusGranted = this._requestAudioFocus();
            if (!audioFocusGranted) {
                throw new Error('Could not request audio focus');
            }

            this.notify({ eventName: AudioPlayerEvents.started });
            const activity = Application.android.foregroundActivity || Application.android.startActivity;
            // set volume controls
            // https://developer.android.com/reference/android/app/Activity.html#setVolumeControlStream(int)
            activity.setVolumeControlStream(android.media.AudioManager.STREAM_MUSIC);

            // register the receiver so when calls or another app takes main   focus the player pauses
            Application.android.registerBroadcastReceiver(android.media.AudioManager.ACTION_AUDIO_BECOMING_NOISY, (context: android.content.Context, intent: android.content.Intent) => {
                this.pause();
            });

            if (this._options?.pitch) {
                const playBackParams = new android.media.PlaybackParams();
                playBackParams.setPitch(this._options.pitch);
                this._player.setPlaybackParams(playBackParams);
            }

            player.start();
        }
    }

    public resume(): void {
        if (this._player) {
            // We call play so it can request audio focus
            this.play();
            this.notify({ eventName: AudioPlayerEvents.started });
        }
    }

    public async seekTo(time: number) {
        if (this._player) {
            this._player.seekTo(time * 1000);
            this.notify({ eventName: AudioPlayerEvents.seek });
        }
    }

    public changePlayerSpeed(speed) {
        // this checks on API 23 and up
        if (SDK_VERSION >= 23 && this.play) {
            if (this._player?.isPlaying()) {
                (this._player as any).setPlaybackParams((this._player as any).getPlaybackParams().setSpeed(speed));
            } else {
                (this._player as any).setPlaybackParams((this._player as any).getPlaybackParams().setSpeed(speed));
                this._player?.pause();
            }
        } else {
            console.warn('Android device API is not 23+. Cannot set the playbackRate on lower Android APIs.');
        }
    }

    public async dispose() {
        if (this._player) {
            this._player.stop();
            this._player.reset();
            // Remove _options since we are back to the Idle state
            // (Refer to: https://developer.android.com/reference/android/media/MediaPlayer#state-diagram)
            this._options = undefined;
            // unregister broadcast receiver
            Application.android.unregisterBroadcastReceiver(android.media.AudioManager.ACTION_AUDIO_BECOMING_NOISY);

            this._abandonAudioFocus();
            this.setAudioFocusManager(null);
        }
    }

    public isAudioPlaying(): boolean {
        if (this._player) {
            return this._player.isPlaying();
        } else {
            return false;
        }
    }

    public async getAudioTrackDuration() {
        const duration = this._player ? this._player.getDuration() : 0;
        return duration;
    }

    /**
     * Helper method to ensure audio focus.
     */
    private _requestAudioFocus(): boolean {
        return this._audioFocusManager?.requestAudioFocus(this);
    }

    private _abandonAudioFocus(preserveMP: boolean = false): void {
        this._audioFocusManager?.abandonAudioFocus(this);

        // Normally we will preserve the MediaPlayer only when pausing
        if (this._mediaPlayer && !preserveMP) {
            this._mediaPlayer.release();
            this._mediaPlayer = undefined;
        }
    }
    /**
     * This getter will instantiate the MediaPlayer if needed
     * and register the listeners. This is done here to avoid
     * code duplication. This is also the reason why we have
     * a `_options`
     */
    private get _player() {
        if (!this._mediaPlayer && this._options) {
            this._mediaPlayer = new android.media.MediaPlayer();

            this._mediaPlayer.setOnCompletionListener(
                new android.media.MediaPlayer.OnCompletionListener({
                    onCompletion: (mp) => {
                        if (this._options && this._options.completeCallback) {
                            if (this._options.loop === true) {
                                mp.seekTo(5);
                                mp.start();
                            }
                            this._options.completeCallback({ player: mp });
                        }

                        if (this._options && !this._options.loop) {
                            // Make sure that we abandon audio focus when playback stops
                            this._abandonAudioFocus(true);
                        }
                    }
                })
            );

            this._mediaPlayer.setOnErrorListener(
                new android.media.MediaPlayer.OnErrorListener({
                    onError: (player: any, error: number, extra: number) => {
                        if (this._options && this._options.errorCallback) {
                            this._options.errorCallback({ player, error, extra });
                        }
                        this.dispose();
                        return true;
                    }
                })
            );
        }

        return this._mediaPlayer;
    }

    private _onAudioFocusChange(data: AudioFocusChangeEventData) {
        const focusChange = data.focusChange;
        switch (focusChange) {
            case android.media.AudioManager.AUDIOFOCUS_GAIN:
                // Set volume level to desired levels
                // if last volume more than 10 just set to 1.0 float
                if (this._lastPlayerVolume && this._lastPlayerVolume >= 10) {
                    this.volume = 1.0;
                } else if (this._lastPlayerVolume) {
                    this.volume = parseFloat('0.' + this._lastPlayerVolume.toString());
                }

                if (this._wasPlaying) {
                    this.resume();
                }
                break;
            case android.media.AudioManager.AUDIOFOCUS_GAIN_TRANSIENT:
                // You have audio focus for a short time
                break;
            case android.media.AudioManager.AUDIOFOCUS_LOSS:
                this._wasPlaying = this._player?.isPlaying() ?? false;
                this.pause();
                break;
            case android.media.AudioManager.AUDIOFOCUS_LOSS_TRANSIENT:
                // Temporary loss of audio focus - expect to get it back - you can keep your resources around
                this._wasPlaying = this._player?.isPlaying() ?? false;
                this.pause();
                break;
            case android.media.AudioManager.AUDIOFOCUS_LOSS_TRANSIENT_CAN_DUCK:
                // Lower the volume, keep playing
                this._lastPlayerVolume = this.volume;
                this.volume = 0.2;
                break;
        }
    }
}
