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

export class TNSRecorder extends Observable {
    private _recorder: any;
    private _recordingSession: any;

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
                let errorRef = new interop.Reference<NSError>();
                this._recordingSession.setCategoryError(AVAudioSessionCategoryPlayAndRecord, errorRef);
                if (errorRef && errorRef.value) {
                    throw interop.NSErrorWrapper(errorRef.value);
                }

                this._recordingSession.setActiveError(true, null);
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
                        recordSetting.setValueForKey(NSNumber.numberWithInt(AVAudioQuality.Medium), 'AVEncoderAudioQualityKey');
                        recordSetting.setValueForKey(NSNumber.numberWithFloat(16000.0), 'AVSampleRateKey');
                        recordSetting.setValueForKey(NSNumber.numberWithInt(1), 'AVNumberOfChannelsKey');

                        const url = NSURL.fileURLWithPath(options.filename);

                        //@ts-ignore
                        this._recorder = AVAudioRecorder.alloc().initWithURLSettingsError(url, recordSetting, errorRef);
                        if (errorRef && errorRef.value) {
                            throw interop.NSErrorWrapper(errorRef.value);
                        } else {
                            this._recorder.delegate = TNSRecorderDelegate.initWithOwner(this);
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
                this._recorder.meteringEnabled = false;
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
                    this._recordingSession.setActiveError(false, null);
                    this._recorder.release();
                    this._recorder = undefined;
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
    }
}
