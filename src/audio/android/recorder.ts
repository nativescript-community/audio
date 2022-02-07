import { check, request } from '@nativescript-community/perms';
import { Application } from '@nativescript/core';
import { AudioRecorderOptions } from '..';

export class TNSRecorder {
    private _recorder: any;

    get android() {
        return this._recorder;
    }

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

        if (this._recorder) {
            // reset for reuse
            this._recorder.reset();
        } else {
            this._recorder = new android.media.MediaRecorder();
        }

        const audioSource = options.source ? options.source : 0;
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

        this._recorder.setOutputFile(options.filename);

        // On Error
        this._recorder.setOnErrorListener(
            new android.media.MediaRecorder.OnErrorListener({
                onError: (recorder: any, error: number, extra: number) => {
                    options.errorCallback({ recorder, error, extra });
                }
            })
        );

        // On Info
        this._recorder.setOnInfoListener(
            new android.media.MediaRecorder.OnInfoListener({
                onInfo: (recorder: any, info: number, extra: number) => {
                    options.infoCallback({ recorder, info, extra });
                }
            })
        );

        this._recorder.prepare();
        this._recorder.start();
    }

    public getMeters(): number {
        if (this._recorder != null) return this._recorder.getMaxAmplitude();
        else return 0;
    }

    public async pause() {
        if (this._recorder) {
            this._recorder.pause();
        }
    }

    public async resume() {
        if (this._recorder) {
            this._recorder.resume();
        }
    }

    public async stop() {
        if (this._recorder) {
            this._recorder.stop();
        }
    }

    public async dispose() {
        if (this._recorder) {
            this._recorder.release();
        }
        this._recorder = undefined;
    }
}
