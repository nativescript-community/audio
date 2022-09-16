import { check, request } from '@nativescript-community/perms';
import { Application } from '@nativescript/core';
import { ANDROID_ENCODER_PCM, ANDROID_ENCODER_PCM_16, AudioRecorderOptions } from '..';

export class TNSRecorder {
    private _recorder: any;
    private _wavrecorder: any;


    public static CAN_RECORD(): boolean {
        const pManager = Application.android.context.getPackageManager();
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

        const audioSource = options.source ? options.source : 0;
        if (this._recorder) {
            // reset for reuse
            this._recorder.reset();
        } else {
            if (options.encoder === ANDROID_ENCODER_PCM || options.encoder === ANDROID_ENCODER_PCM_16) {
                console.log('WaveRecorder');
                //@ts-ignore
                this._wavrecorder = new com.github.squti.androidwaverecorder.WaveRecorder(options.filename);
            } else {
                this._recorder = new android.media.MediaRecorder();
            }
        }
        if (this._recorder) {
            this._recorder.setAudioSource(audioSource);
            const outFormat = options.format ? options.format : 0;
            this._recorder.setOutputFormat(outFormat);

            const encoder = options.encoder ? options.encoder : 0;
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
            this._wavrecorder.waveConfig.sampleRate = options.sampleRate || 44100;
            this._wavrecorder.waveConfig.channels = options.channels === 1 ? android.media.AudioFormat.CHANNEL_IN_MONO : 2;
            this._wavrecorder.waveConfig.audioEncoding = options.encoder === ANDROID_ENCODER_PCM_16 ? android.media.AudioFormat.ENCODING_PCM_16BIT : android.media.AudioFormat.ENCODING_PCM_8BIT;
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
