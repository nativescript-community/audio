import { File, Observable, Utils, knownFolders, path as nsFilePath } from '@nativescript/core';
import { AudioPlayerOptions } from '.';
import { wrapNativeException } from './utils.ios';

@NativeClass()
class TNSPlayerDelegate extends NSObject implements SFBAudioPlayerDelegate {
    static ObjCProtocols = [SFBAudioPlayerDelegate];
    private _owner: WeakRef<TNSPlayer>;

    static initWithOwner(owner: TNSPlayer) {
        const delegate = TNSPlayerDelegate.new() as TNSPlayerDelegate;
        delegate._owner = new WeakRef(owner);
        return delegate;
    }

    audioPlayerDecodingStarted(audioPlayer: SFBAudioPlayer, decoder: SFBPCMDecoding): void {}
    audioPlayerRenderingStarted(audioPlayer: SFBAudioPlayer, decoder: SFBPCMDecoding): void {}

    audioPlayerEndOfAudio(player?: any, flag: boolean = true) {
        const owner = this._owner?.get();
        if (owner) {
            if (flag && owner.completeCallback) {
                owner.completeCallback({ player, flag });
            } else if (!flag && owner.errorCallback) {
                owner.errorCallback({ player, flag });
            }
        }
    }

    audioPlayerEncounteredError(player: any, error: NSError) {
        const owner = this._owner?.get();
        if (owner) {
            if (owner.errorCallback) {
                owner.errorCallback({ player, error });
            }
        }
    }
}

export { TNSPlayerDelegate };

export class AudioFocusManager extends Observable {}

export class TNSPlayer extends Observable {
    completeCallback: any;
    errorCallback: any;
    infoCallback: any;

    private _player: NSSFBAudioPlayer;
    private _task: NSURLSessionDataTask;
    private delegate: TNSPlayerDelegate;

    private createPlayer() {
        if (this._player) {
            return;
        }
        this._player = NSSFBAudioPlayer.new();
        return this._player;
    }

    get ios(): any {
        return this._player;
    }

    get volume(): number {
        return this._player?.volume ?? 0;
    }

    set volume(value: number) {
        if (this._player && value >= 0) {
            this._player.volume = value;
        }
    }

    public get duration() {
        if (this._player) {
            return Math.round(this._player.totalTime * 1000);
        } else {
            return 0;
        }
    }

    get currentTime(): number {
        return this._player ? Math.round(this._player.currentTime * 1000) : 0;
    }

    public setAudioFocusManager(manager: any) {}

    public initFromFile(options: AudioPlayerOptions) {
        // init only
        options.autoPlay = false;
        return this.playFromFile(options);
    }

    private prepareAudioSession(options: AudioPlayerOptions) {
        this.completeCallback = options.completeCallback;
        this.errorCallback = options.errorCallback;
        this.infoCallback = options.infoCallback;

        const errorRef = new interop.Reference<NSError>();
        const audioSession = AVAudioSession.sharedInstance();
        audioSession.setCategoryModeRouteSharingPolicyOptionsError(
            options.sessionCategory ?? AVAudioSessionCategoryAmbient,
            options.sessionMode ?? AVAudioSessionModeDefault,
            options.sessionRouteSharingPolicy ?? AVAudioSessionRouteSharingPolicy.Default,
            options.sessionCategoryOptions ?? (options.audioMixing ? AVAudioSessionCategoryOptions.MixWithOthers : 0),
            //@ts-expect-error missing error argument
            errorRef
        );
        if (errorRef?.value) {
            throw wrapNativeException(errorRef.value);
        }
        const output = audioSession.currentRoute.outputs.lastObject.portType;
        // audioSession.setCategoryError(options.sessionCategory !== undefined ? options.sessionCategory : AVAudioSessionCategoryAmbient);
        if (output.match(/Receiver/)) {
            audioSession.overrideOutputAudioPortError(1936747378 /* AVAudioSessionPortOverride.Speaker */);
        }
        audioSession.setActiveError(options.active ?? true);
    }
    private handleStartPlayer(options: AudioPlayerOptions, errorRef: interop.Reference<NSError>) {
        if (this.delegate === undefined) {
            this.delegate = TNSPlayerDelegate.initWithOwner(this);
        }
        this._player.delegate = this.delegate;

        // if (options.metering) {
        // this._player.meteringEnabled = true;
        // }

        if (options.seek) {
            this.seekTo(options.seek);
        }
        if (options.autoPlay !== false) {
            this._player.playReturningError(errorRef);
            // this._player.play();
            if (errorRef?.value) {
                throw wrapNativeException(errorRef.value);
            }
        }
    }

    public playFromFile(options: AudioPlayerOptions): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                let fileName = Utils.isString(options.audioFile) ? options.audioFile.trim() : '';
                if (fileName.indexOf('~/') === 0) {
                    fileName = nsFilePath.join(knownFolders.currentApp().path, fileName.replace('~/', ''));
                }

                const errorRef = new interop.Reference<NSError>();

                const url = NSURL.fileURLWithPath(fileName);
                const extension = url.pathExtension.toLowerCase();
                if (!SFBAudioDecoder.supportedPathExtensions.containsObject(extension)) {
                    throw new Error(`unsupported audio extension ${extension}`);
                }
                let decoder: SFBAudioDecoder;
                if (SFBAudioDecoder.handlesPathsWithExtension(extension)) {
                    decoder = SFBAudioDecoder.alloc().initWithURLError(url);
                } else if (SFBDSDDecoder.handlesPathsWithExtension(extension)) {
                    decoder = SFBDSDPCMDecoder.alloc().initWithDecoderError(SFBDSDDecoder.alloc().initWithURLError(url)) as any;
                }
                this.createPlayer();
                if (!!options.loop) {
                    if (errorRef?.value) {
                        return reject(wrapNativeException(errorRef.value));
                    }
                    const loopDecoder = SFBLoopableRegionDecoder.alloc().initWithDecoderFramePositionFrameLengthRepeatCountError(decoder, 0, decoder.frameLength, Number.MAX_SAFE_INTEGER);
                    this._player.enqueueDecoderForImmediatePlaybackError(loopDecoder, false, errorRef);
                } else {
                    this._player.enqueueDecoderForImmediatePlaybackError(decoder, false, errorRef);
                }
                if (errorRef?.value) {
                    reject(wrapNativeException(errorRef.value));
                } else if (this._player) {
                    this.prepareAudioSession(options);
                    this.handleStartPlayer(options, errorRef);

                    resolve(null);
                } else {
                    reject();
                }
            } catch (ex) {
                if (this.errorCallback) {
                    this.errorCallback({ ex });
                }
                reject(ex);
            }
        });
    }

    public async initFromUrl(options: AudioPlayerOptions) {
        // init only
        options.autoPlay = false;
        return this.playFromUrl(options);
    }

    public playFromUrl(options: AudioPlayerOptions): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                this._task = NSURLSession.sharedSession.dataTaskWithURLCompletionHandler(NSURL.URLWithString(options.audioFile), (data, response, error) => {
                    if (error !== null) {
                        if (this.errorCallback) {
                            this.errorCallback({ error });
                        }
                        reject(error);
                    }
                    const errorRef = new interop.Reference<NSError>();
                    const inputSource = SFBInputSource.inputSourceWithData(data);
                    const decoder = SFBAudioDecoder.alloc().initWithInputSourceError(inputSource, errorRef);
                    if (errorRef?.value) {
                        return reject(wrapNativeException(errorRef.value));
                    }
                    decoder.openReturningError(errorRef);
                    if (errorRef?.value) {
                        return reject(wrapNativeException(errorRef.value));
                    }

                    this.createPlayer();
                    if (options.loop) {
                        const loopDecoder = SFBLoopableRegionDecoder.alloc().initWithDecoderFramePositionFrameLengthRepeatCountError(decoder, 0, decoder.frameLength, Number.MAX_SAFE_INTEGER);
                        this._player.enqueueDecoderForImmediatePlaybackError(loopDecoder, false, errorRef);
                    } else {
                        this._player.enqueueDecoderForImmediatePlaybackError(decoder, false, errorRef);
                    }
                    // this._player = AVAudioPlayer.alloc().initWithDataError(data, errorRef);
                    if (errorRef?.value) {
                        reject(wrapNativeException(errorRef.value));
                    } else if (this._player) {
                        this.prepareAudioSession(options);
                        this.handleStartPlayer(options, errorRef);

                        resolve(null);
                    } else {
                        reject();
                    }
                });

                this._task.resume();
            } catch (ex) {
                this.errorCallback?.({ ex });
                reject(ex);
            }
        });
    }

    public async pause() {
        try {
            if (this._player && this._player.isPlaying) {
                this._player.pause();
            }
        } catch (ex) {
            this.errorCallback?.({ ex });
            throw ex;
        }
    }

    public async stop() {
        try {
            if (this._player && this._player.isPlaying) {
                this._player.stop();
                this.errorCallback?.({});
            }
        } catch (ex) {
            this.errorCallback?.({ ex });
            throw ex;
        }
    }

    public async play() {
        try {
            if (!this.isAudioPlaying()) {
                this._player.resume();
            }
            return true;
        } catch (ex) {
            this.errorCallback?.({ ex });
            throw ex;
        }
    }

    public resume(): void {
        if (this._player) {
            this._player.resume();
        }
    }

    public playAtTime(time: number): void {
        if (this._player) {
            this._player.pause();
            this._player.seekToTime(time);
            this._player.resume();
        }
    }

    public async seekTo(time: number) {
        return new Promise((resolve, reject) => {
            try {
                if (this._player) {
                    this._player.seekToTime(time);
                }
                resolve(true);
            } catch (ex) {
                this.errorCallback?.({ ex });
                throw ex;
            }
        });
    }

    public async dispose() {
        try {
            if (this._player && this.isAudioPlaying()) {
                this._player.stop();
            }
            const audioSession = AVAudioSession.sharedInstance();
            audioSession.setActiveError(false);
            this._reset();
        } catch (ex) {
            this.errorCallback?.({ ex });
            throw ex;
        }
    }

    public isAudioPlaying(): boolean {
        return this._player ? this._player.isPlaying : false;
    }

    public async getAudioTrackDuration() {
        try {
            const duration = this._player ? Math.round(this._player.totalTime * 1000) : 0;
            return duration;
        } catch (ex) {
            this.errorCallback?.({ ex });
            throw ex;
        }
    }

    public changePlayerSpeed(speed) {
        if (this._player && speed) {
            // make sure speed is a number/float
            if (typeof speed === 'string') {
                speed = parseFloat(speed);
            }
            this._player.rate = speed;
        }
    }

    private _reset() {
        if (this._player) {
            this._player = undefined;
        }
        if (this.delegate) {
            this.delegate = undefined;
        }
        if (this._task) {
            this._task.cancel();
            this._task = undefined;
        }
        this.completeCallback = undefined;
        this.errorCallback = undefined;
        this.infoCallback = undefined;
    }
}

export function testPlayer(fileName) {
    const url = NSURL.fileURLWithPath(fileName);
    const extension = url.pathExtension.toLowerCase();
    if (!SFBAudioDecoder.supportedPathExtensions.containsObject(extension)) {
        throw new Error(`unsupported audio extension ${extension}`);
    }
    let decoder: SFBAudioDecoder;
    if (SFBAudioDecoder.handlesPathsWithExtension(extension)) {
        decoder = SFBAudioDecoder.alloc().initWithURLError(url);
    } else if (SFBDSDDecoder.handlesPathsWithExtension(extension)) {
        decoder = SFBDSDPCMDecoder.alloc().initWithDecoderError(SFBDSDDecoder.alloc().initWithURLError(url)) as any;
    }
    const player = NSSFBAudioPlayer.new();

    player.enqueueDecoderForImmediatePlaybackError(decoder, false);
    player.playReturningError();
}
