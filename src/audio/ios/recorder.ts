import { Observable } from '@nativescript/core';
import { AudioRecorderOptions } from '..';

@NativeClass()
class TNSRecorderDelegate extends NSObject implements AVAudioRecorderDelegate {
    static ObjCProtocols = [AVAudioRecorderDelegate];
    private _owner: WeakRef<TNSRecorder>;

    static initWithOwner(owner: TNSRecorder) {
        const delegate = TNSRecorderDelegate.new() as TNSRecorderDelegate;
        delegate._owner = new WeakRef(owner);
        return delegate;
    }

    audioRecorderDidFinishRecording(recorder: any, success: boolean) {
        const owner = this._owner.get();
        if (owner) {
            // owner.notify({
            //   eventName: 'RecorderFinished',
            // })
        }
    }

    audioRecorderDidFinishRecordingSuccessfully(recorder: AVAudioRecorder, flag) {
        const owner = this._owner.get();
        if (owner) {
            // owner.notify({
            //   eventName: 'RecorderFinishedSuccessfully',
            // })
        }
    }
}

export { TNSRecorderDelegate };

function isInt(n) {
    return n % 1 === 0;
}
function isBoolean(n) {
    return typeof n === 'boolean';
}

export class TNSRecorder extends Observable {
    private _recorder: AVAudioRecorder;
    private _recordingSession: AVAudioSession;

    private _recorderOptions: AudioRecorderOptions;

    static CAN_RECORD(): boolean {
        return true;
    }

    get ios() {
        return this._recorder;
    }

    requestRecordPermission() {
        return new Promise((resolve, reject) => {
            this._recordingSession.requestRecordPermission((allowed: boolean) => {
                if (allowed) {
                    resolve(true);
                } else {
                    reject('Record permissions denied');
                }
            });
        });
    }

    start(options: AudioRecorderOptions): Promise<any> {
        this._recorderOptions = options;
        return new Promise((resolve, reject) => {
            try {
                this._recordingSession = AVAudioSession.sharedInstance();

                const errorRef = new interop.Reference<NSError>();

                this._recordingSession.setCategoryModeRouteSharingPolicyOptionsError(
                    options.sessionCategory !== undefined ? options.sessionCategory : AVAudioSessionCategoryPlayAndRecord,
                    options.sessionMode !== undefined ? options.sessionMode : AVAudioSessionModeDefault,
                    options.sessionRouteSharingPolicy !== undefined ? options.sessionRouteSharingPolicy : AVAudioSessionRouteSharingPolicy.Default,
                    options.audioMixing ? AVAudioSessionCategoryOptions.MixWithOthers : AVAudioSessionCategoryOptions.DuckOthers,
                    //@ts-ignore
                    errorRef
                );
                //@ts-ignore
                if (errorRef && errorRef.value) {
                    throw interop.NSErrorWrapper(errorRef.value);
                }

                this._recordingSession.setActiveError(true);
                this._recordingSession.requestRecordPermission((allowed: boolean) => {
                    if (allowed) {
                        // var recordSetting = new NSMutableDictionary((<any>[NSNumber.numberWithInt(kAudioFormatMPEG4AAC), NSNumber.numberWithInt((<any>AVAudioQuality).Medium.rawValue), NSNumber.numberWithFloat(16000.0), NSNumber.numberWithInt(1)]),
                        //   (<any>["AVFormatIDKey", "AVEncoderAudioQualityKey", "AVSampleRateKey", "AVNumberOfChannelsKey"]));

                        const recordSetting = NSMutableDictionary.alloc().init();

                        if (options.format) {
                            recordSetting.setValueForKey(NSNumber.numberWithInt(options.format), 'AVFormatIDKey');
                        } else {
                            recordSetting.setValueForKey(NSNumber.numberWithInt(kAudioFormatMPEG4AAC), 'AVFormatIDKey');
                        }
                        // recordSetting.setValueForKey(
                        //   NSNumber.numberWithInt((<any>AVAudioQuality).Medium.rawValue),
                        //   'AVEncoderAudioQualityKey'
                        // );
                        // recordSetting.setValueForKey(NSNumber.numberWithInt(options.quality || AVAudioQuality.Medium), 'AVEncoderAudioQualityKey');
                        recordSetting.setValueForKey(NSNumber.numberWithFloat(options.sampleRate || 16000), 'AVSampleRateKey');
                        recordSetting.setValueForKey(NSNumber.numberWithInt(options.channels || 1), 'AVNumberOfChannelsKey');
                        if (options.ios) {
                            Object.keys(options.ios).forEach((k) => {
                                const value = options.ios[k];
                                if (isBoolean(value)) {
                                    recordSetting.setValueForKey(NSNumber.numberWithBool(value), k);
                                }
                                if (typeof value === 'number') {
                                    if (isInt(value)) {
                                        recordSetting.setValueForKey(NSNumber.numberWithFloat(value), k);
                                    } else {
                                        recordSetting.setValueForKey(NSNumber.numberWithInt(value), k);
                                    }
                                } else {
                                    recordSetting.setValueForKey(value, k);
                                }
                            });
                        }
                        const url = NSURL.fileURLWithPath(options.filename);

                        if (!this._recorder) {
                            //@ts-ignore
                            this._recorder = AVAudioRecorder.alloc().initWithURLSettingsError(url, recordSetting, errorRef);
                        }
                        if (errorRef && errorRef.value) {
                            throw interop.NSErrorWrapper(errorRef.value);
                        } else {
                            if (!this._recorder.delegate) {
                                this._recorder.delegate = TNSRecorderDelegate.initWithOwner(this);
                            }
                            if (options.metering) {
                                this._recorder.meteringEnabled = true;
                            }
                            if (options.maxDuration) {
                                this._recorder.recordForDuration(options.maxDuration / 1000);
                            } else {
                                this._recorder.prepareToRecord();
                                this._recorder.record();
                            }

                            resolve(null);
                        }
                    }
                });
            } catch (ex) {
                reject(ex);
            }
        });
    }

    pause(): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                if (this._recorder) {
                    this._recorder.pause();
                }
                resolve(null);
            } catch (ex) {
                reject(ex);
            }
        });
    }

    resume(): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                if (this._recorder) {
                    this._recorder.record();
                }
                resolve(null);
            } catch (ex) {
                reject(ex);
            }
        });
    }

    stop(): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                if (this._recorder) {
                    this._recorder.stop();
                }
                // may need this in future
                // this._recordingSession.setActiveError(false, null);
                resolve(null);
            } catch (ex) {
                reject(ex);
            }
        });
    }

    dispose(): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                if (this._recorder) {
                    this._recorder.stop();
                    this._recorder.meteringEnabled = false;
                    this._recordingSession.setActiveError(false);
                    // this._recorder.release();
                    this._recorder.delegate = null;
                    this._recorder = null;
                }
                resolve(null);
            } catch (ex) {
                reject(ex);
            }
        });
    }

    isRecording() {
        return this._recorder && this._recorder.recording;
    }

    getMeters(channel?: number) {
        if (this._recorder) {
            if (!this._recorder.meteringEnabled) {
                this._recorder.meteringEnabled = true;
            }
            this._recorder.updateMeters();
            return this._recorder.averagePowerForChannel(channel);
        }
        return null;
    }
}
