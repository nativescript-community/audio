import { check, request } from '@nativescript-community/perms';
import { Application, Utils } from '@nativescript/core';
import { ANDROID_ENCODER_PCM, AudioRecorderAndroidOptions, AudioRecorderOptions } from '..';

export class TNSRecorder {
    // private _recorder: android.media.MediaRecorder;
    // private _wavrecorder: com.github.squti.androidwaverecorder.WaveRecorder;

    private _recorder: android.media.MediaRecorder;
    private _wavrecorder: com.kailashdabhi.omrecorder.Recorder;

    public static CAN_RECORD(): boolean {
        const pManager = Utils.android.getApplicationContext().getPackageManager();
        const canRecord = pManager.hasSystemFeature(android.content.pm.PackageManager.FEATURE_MICROPHONE);
        if (canRecord) {
            return true;
        } else {
            return false;
        }
    }

    public requestRecordPermission() {
        return request('microphone');
    }

    public hasRecordPermission() {
        const permission = check('microphone');
        return permission[0] === 'authorized';
    }

    public async start(options: AudioRecorderOptions) {
        // bake the permission into this so the dev doesn't have to call it
        await this.requestRecordPermission();
        const androidOptions: AudioRecorderAndroidOptions = options.android || {};
        const audioSource = options.source ? options.source : 0;
        if (this._recorder) {
            // reset for reuse
            this._recorder.reset();
        } else {
            if (androidOptions.wavAaudioFormat !== undefined) {
                //@ts-ignore
                this._wavrecorder = new com.kailashdabhi.omrecorder.OmRecorder.wav(
                    new com.kailashdabhi.omrecorder.PullTransport.Default(
                        new com.kailashdabhi.omrecorder.PullableSource.Default(
                            new com.kailashdabhi.omrecorder.AudioRecordConfig.Default(
                                androidOptions.audioSource !== undefined ? androidOptions.audioSource : android.media.MediaRecorder.AudioSource.MIC,
                                androidOptions.wavAaudioFormat,
                                options.channels === 1 ? android.media.AudioFormat.CHANNEL_IN_MONO : android.media.AudioFormat.CHANNEL_IN_STEREO,
                                options.sampleRate || 16000
                            )
                        )
                    ),
                    new java.io.File(options.filename)
                );
            } else {
                this._recorder = new android.media.MediaRecorder();
            }
        }
        if (this._recorder) {
            this._recorder.setAudioSource(audioSource);
            const outFormat = options.format ? options.format : 0;
            this._recorder.setOutputFormat(outFormat);

            const encoder = androidOptions.encoder ? androidOptions.encoder : 0;
            this._recorder.setAudioEncoder(encoder);

            if (options.channels) {
                this._recorder.setAudioChannels(options.channels);
            }
            if (options.sampleRate) {
                this._recorder.setAudioSamplingRate(options.sampleRate);
            }
            if (options.bitRate) {
                this._recorder.setAudioEncodingBitRate(options.bitRate);
            }
            if (options.maxDuration) {
                this._recorder.setMaxDuration(options.maxDuration);
            }
            // On Error
            options.errorCallback &&
                this._recorder.setOnErrorListener(
                    new android.media.MediaRecorder.OnErrorListener({
                        onError: (recorder: any, error: number, extra: number) => {
                            options.errorCallback({ recorder, error, extra });
                        }
                    })
                );

            // On Info
            options.infoCallback &&
                this._recorder.setOnInfoListener(
                    new android.media.MediaRecorder.OnInfoListener({
                        onInfo: (recorder: any, info: number, extra: number) => {
                            options.infoCallback({ recorder, info, extra });
                        }
                    })
                );
            this._recorder.setOutputFile(options.filename);
            this._recorder.prepare();
            this._recorder.start();
        } else if (this._wavrecorder) {
            this._wavrecorder.startRecording();
        }
    }

    public getMeters(): number {
        if (this._recorder != null) return this._recorder.getMaxAmplitude();
        else return 0;
    }

    public async pause() {
        if (this._recorder) {
            // not working yet with pcm
            this._recorder.pause();
        } else if (this._wavrecorder) {
            this._wavrecorder.pauseRecording();
        }
    }

    public async resume() {
        if (this._recorder) {
            // not working yet with pcm
            this._recorder.resume();
        } else if (this._wavrecorder) {
            this._wavrecorder.resumeRecording();
        }
    }

    public async stop() {
        if (this._recorder) {
            this._recorder.stop();
        } else if (this._wavrecorder) {
            this._wavrecorder.stopRecording();
        }
    }

    public async dispose() {
        if (this._recorder) {
            this._recorder.release();
        }
        this._recorder = undefined;
    }
}
