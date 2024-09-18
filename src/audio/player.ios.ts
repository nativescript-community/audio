import { Observable, Utils, knownFolders, path as nsFilePath } from '@nativescript/core';
import { AudioPlayerOptions } from '.';

declare let AVAudioPlayer;

@NativeClass()
class TNSPlayerDelegate extends NSObject implements AVAudioPlayerDelegate {
    static ObjCProtocols = [AVAudioPlayerDelegate];
    private _owner: WeakRef<TNSPlayer>;

    static initWithOwner(owner: TNSPlayer) {
        const delegate = TNSPlayerDelegate.new() as TNSPlayerDelegate;
        delegate._owner = new WeakRef(owner);
        return delegate;
    }

    audioPlayerDidFinishPlayingSuccessfully(player?: any, flag?: boolean) {
        const owner = this._owner?.get();
        if (owner) {
            if (flag && owner.completeCallback) {
                owner.completeCallback({ player, flag });
            } else if (!flag && owner.errorCallback) {
                owner.errorCallback({ player, flag });
            }
        }
    }

    audioPlayerDecodeErrorDidOccurError(player: any, error: NSError) {
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

    private _player: AVAudioPlayer;
    private _task: NSURLSessionDataTask;
    private delegate: TNSPlayerDelegate;

    get ios(): any {
        return this._player;
    }

    get volume(): number {
        return this._player ? this._player.volume : 0;
    }

    set volume(value: number) {
        if (this._player && value >= 0) {
            this._player.volume = value;
        }
    }

    public get duration() {
        if (this._player) {
            return this._player.duration;
        } else {
            return 0;
        }
    }

    get currentTime(): number {
        return this._player ? this._player.currentTime : 0;
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

        const audioSession = AVAudioSession.sharedInstance();
        audioSession.setCategoryModeRouteSharingPolicyOptionsError(
            options.sessionCategory !== undefined ? options.sessionCategory : AVAudioSessionCategoryAmbient,
            options.sessionMode !== undefined ? options.sessionMode : AVAudioSessionModeDefault,
            options.sessionRouteSharingPolicy !== undefined ? options.sessionRouteSharingPolicy : AVAudioSessionRouteSharingPolicy.Default,
            options.audioMixing ? AVAudioSessionCategoryOptions.MixWithOthers : AVAudioSessionCategoryOptions.DuckOthers,
            //@ts-ignore
            null
        );
        const output = audioSession.currentRoute.outputs.lastObject.portType;
        if (output.match(/Receiver/)) {
            try {
                audioSession.setCategoryError(AVAudioSessionCategoryPlayAndRecord);
                audioSession.overrideOutputAudioPortError(AVAudioSessionPortOverride.Speaker);
                audioSession.setActiveError(true);
            } catch (err) {
                console.error('setting audioSession catergory failed', err);
            }
        }
    }
    private handleStartPlayer(options: AudioPlayerOptions) {
        if (this.delegate === undefined) {
            this.delegate = TNSPlayerDelegate.initWithOwner(this);
        }
        this._player.delegate = this.delegate;
        // enableRate to change playback speed
        this._player.enableRate = true;

        if (options.metering) {
            this._player.meteringEnabled = true;
        }

        if (options.loop) {
            this._player.numberOfLoops = -1;
        }

        if (options.autoPlay !== false) {
            this._player.play();
        }
    }

    public playFromFile(options: AudioPlayerOptions): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                let fileName = Utils.isString(options.audioFile) ? options.audioFile.trim() : '';
                if (fileName.indexOf('~/') === 0) {
                    fileName = nsFilePath.join(knownFolders.currentApp().path, fileName.replace('~/', ''));
                }

                this.prepareAudioSession(options);

                const errorRef = new interop.Reference<NSError>();
                this._player = AVAudioPlayer.alloc().initWithContentsOfURLError(NSURL.fileURLWithPath(fileName), errorRef);
                if (errorRef && errorRef.value) {
                    throw interop.NSErrorWrapper(errorRef.value);
                } else if (this._player) {
                    this.handleStartPlayer(options);

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

                    this.prepareAudioSession(options);

                    const errorRef = new interop.Reference<NSError>();
                    this._player = AVAudioPlayer.alloc().initWithDataError(data, errorRef);
                    if (errorRef && errorRef.value) {
                        throw interop.NSErrorWrapper(errorRef.value);
                    } else if (this._player) {
                        this.handleStartPlayer(options);

                        resolve(null);
                    } else {
                        reject();
                    }
                });

                this._task.resume();
            } catch (ex) {
                if (this.errorCallback) {
                    this.errorCallback({ ex });
                }
                reject(ex);
            }
        });
    }

    public async pause() {
        try {
            if (this._player && this._player.playing) {
                this._player.pause();
            }
        } catch (ex) {
            if (this.errorCallback) {
                this.errorCallback({ ex });
            }
            throw ex;
        }
    }

    public async stop() {
        try {
            if (this._player && this._player.playing) {
                this._player.stop();
            }
        } catch (ex) {
            if (this.errorCallback) {
                this.errorCallback({ ex });
            }
            throw ex;
        }
    }

    public async play() {
        try {
            if (!this.isAudioPlaying()) {
                this._player.play();
            }
            return true;
        } catch (ex) {
            if (this.errorCallback) {
                this.errorCallback({ ex });
            }
            throw ex;
        }
    }

    public resume(): void {
        if (this._player) {
            this._player.play();
        }
    }

    public playAtTime(time: number): void {
        if (this._player) {
            this._player.playAtTime(time);
        }
    }

    public async seekTo(time: number) {
        return new Promise((resolve, reject) => {
            try {
                if (this._player) {
                    this._player.currentTime = time;
                }
                resolve(true);
            } catch (ex) {
                if (this.errorCallback) {
                    this.errorCallback({ ex });
                }
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
            if (this.errorCallback) {
                this.errorCallback({ ex });
            }
            throw ex;
        }
    }

    public isAudioPlaying(): boolean {
        return this._player ? this._player.playing : false;
    }

    public async getAudioTrackDuration() {
        try {
            const duration = this._player ? this._player.duration : 0;
            return duration;
        } catch (ex) {
            if (this.errorCallback) {
                this.errorCallback({ ex });
            }
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
    }
}
