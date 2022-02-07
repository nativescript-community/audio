<template>
    <Page ref="page">
        <ActionBar>
            <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="$navigateBack" />
            <Label text="All Sides" />
        </ActionBar>

        <TabView tabsBackgroundColor="#3F51B5" selectedColor="#FF4081">
            <TabViewItem title="Recorder">
                <ScrollView>
                    <StackLayout class="p-10" width="100%">
                        <ActivityIndicator color="#3489db" :busy="isRecording" />
                        <button row="0" col="0" class="btn btn-primary" text="Start Recording" @tap="startRecord" />
                        <Label ::text=" 'Meter Value: ' + audioMeter " textWrap="true" />
                        <button class="btn btn-primary" text="Stop Recording" @tap="stopRecord" />
                        <button class="btn btn-outline text-info" text="Get File" @tap="getFile" />
                        <label :text="recordedAudioFile" class="gray" textWrap="true" />
                        <button class="btn btn-primary" text="Play Recorded" @tap="playRecordedFile" />
                        <button class="btn btn-primary" text="Stop Playback" @tap="pauseAudio" />
                    </StackLayout>
                </ScrollView>
            </TabViewItem>
            <TabViewItem title="Player">
                <ScrollView>
                    <GridLayout rows="auto, auto, auto, auto, auto, auto, auto, auto, auto, auto, auto, auto, auto" columns="*, *, *" class="p-10">
                        <label row="0" colSpan="3" class="center text-primary h3" text="Welcome To Fight Club!" textWrap="true" />
                        <button row="1" colSpan="3" class="btn btn-primary" text="Play Remote Audio" @tap="playRemoteFile" />
                        <label row="2" colSpan="3" text="Note: Remote files can have a lag before playing due to processing and network speeds." class="h4" textWrap="true" />
                        <Label row="3" colSpan="3" text="" class="hr-dark" textWrap="true" />
                        <button row="4" colSpan="3" class="btn btn-primary" text="Play Local Audio File" @tap="playLocalFile" />
                        <label row="5" colSpan="3" class="blue h3 text-center" text="Angel - Theory of a Deadman" textWrap="true" />
                        <Button row="6" col="0" class="btn btn-primary" text="Pause" @tap="pauseAudio" />
                        <Button row="6" col="1" class="btn btn-primary" text="Resume" @tap="resumePlayer" />
                        <button row="6" col="2" class="btn btn-primary" text="Stop" @tap="stopPlaying" />
                        <Label row="7" colSpan="3" text="Player Speed on Android only API 23+" textWrap="true" />
                        <Button row="8" col="0" text="Speed 1" @tap="playSpeed1" />
                        <Button row="8" col="1" text="Speed 1.5" @tap="playSpeed15" />
                        <Button row="8" col="2" text="Speed 2" @tap="playSpeed2" />
                        <Label row="9" col="0" :text="'Duration: ' + audioTrackDuration" textWrap="true" />
                        <Label row="9" col="2" :text="'Remaining: ' + remainingDuration" textWrap="true" />
                        <Label row="10" col="0" text="Volume Slider: " textWrap="true" class="m-t-20" />
                        <Slider row="10" col="1" colSpan="2" id="volumeSlider" minValue="0" maxValue="100" value="100" class="m-t-20" />
                        <Label :text="'Current Volume for Player ' + currentVolume" textWrap="true" />
                        <Button row="11" col="0" text="Mute" class="btn btn-primary" @tap="muteTap" />
                        <Button row="11" col="1" text="Unmute" class="btn btn-primary" @tap="unmuteTap" />
                        <Button row="12" col="0" colSpan="2" text="Go to 8 Seconds" class="btn btn-primary" @tap="skipTo8" />
                    </GridLayout>
                </ScrollView>
            </TabViewItem>
        </TabView>
    </Page>
</template>

<script lang="ts">
import { AudioPlayerOptions, AudioRecorderOptions, TNSPlayer, TNSRecorder } from '@akylas/nativescript-audio';
import { Component, Prop, Watch } from 'vue-property-decorator';
import Vue, { NativeScriptVue } from 'nativescript-vue';
import { Application, Dialogs, File, Observable, Page, Slider, Utils, isAndroid, knownFolders } from '@nativescript/core';

@Component({})
export default class Demo extends Vue {
    _meterInterval;
    _slider;
    _recorder;
    _player: TNSPlayer;

    isPlaying = false;
    isRecording = false;
    audioMeter = '0';
    recordedAudioFile;
    currentVolume;
    audioTrackDuration;
    remainingDuration; // used to show the remaining time of the audio track

    audioUrls: [
        {
            name: 'Fight Club';
            pic: '~/pics/canoe_girl.jpeg';
            url: 'http://www.noiseaddicts.com/samples_1w72b820/2514.mp3';
        },
        {
            name: 'To The Bat Cave!!!';
            pic: '~/pics/bears.jpeg';
            url: 'http://www.noiseaddicts.com/samples_1w72b820/17.mp3';
        },
        {
            name: 'Marlon Brando';
            pic: '~/pics/northern_lights.jpeg';
            url: 'http://www.noiseaddicts.com/samples_1w72b820/47.mp3';
        }
    ];

    mounted() {
        this._player = new TNSPlayer();
        this._player.debug = true; // set true for tns_player logs

        this._recorder = new TNSRecorder();
        this._recorder.debug = true; // set true for tns_recorder logs

        this.currentVolume = 1;
        this._slider = (this.$refs.page as NativeScriptVue<Page>).nativeView.getViewById('volumeSlider');

        // Set player volume
        if (this._slider) {
            this._slider.on('valueChange', (data) => {
                this._player.volume = this._slider.value / 100;
            });
        }
    }
    get message() {
        return 'Audio {N}-Vue app';
    }
    async startRecord(args) {
        try {
            if (!TNSRecorder.CAN_RECORD()) {
                Dialogs.alert('This device cannot record audio.');
                return;
            }
            const audioFolder = knownFolders.currentApp().getFolder('audio');
            console.log(JSON.stringify(audioFolder));

            let androidFormat;
            let androidEncoder;
            if (isAndroid) {
                // m4a
                // static constants are not available, using raw values here
                // androidFormat = android.media.MediaRecorder.OutputFormat.MPEG_4;
                androidFormat = 2;
                // androidEncoder = android.media.MediaRecorder.AudioEncoder.AAC;
                androidEncoder = 3;
            }

            const recordingPath = `${audioFolder.path}/recording.${this.platformExtension()}`;

            const recorderOptions: AudioRecorderOptions = {
                filename: recordingPath,

                format: androidFormat,

                encoder: androidEncoder,

                metering: true,

                infoCallback: (infoObject) => {
                    console.log(JSON.stringify(infoObject));
                },

                errorCallback: (errorObject) => {
                    console.log(JSON.stringify(errorObject));
                }
            };

            await this._recorder.start(recorderOptions);
            this.isRecording = true;
            if (recorderOptions.metering) {
                this._initMeter();
            }
        } catch (err) {
            this.isRecording = false;
            this._resetMeter();
            Dialogs.alert(err);
        }
    }

    async stopRecord(args) {
        this._resetMeter();
        await this._recorder.stop().catch((ex) => {
            console.log(ex);
            this.isRecording = false;
            this._resetMeter();
        });

        this.isRecording = false;
        alert('Recorder stopped.');
        this._resetMeter();
    }

    _initMeter() {
        this._resetMeter();
        this._meterInterval = setInterval(() => {
            this.audioMeter = this._recorder.getMeters();
            console.log(this.audioMeter);
        }, 300);
    }

    _resetMeter() {
        if (this._meterInterval) {
            this.audioMeter = '0';
            clearInterval(this._meterInterval);
            this._meterInterval = undefined;
        }
    }

    getFile(args) {
        try {
            const audioFolder = knownFolders.currentApp().getFolder('audio');
            const recordedFile = audioFolder.getFile(`recording.${this.platformExtension()}`);
            console.log('recording exists: ' + File.exists(recordedFile.path));
            this.recordedAudioFile = recordedFile.path;
        } catch (ex) {
            console.log(ex);
        }
    }

    async playRecordedFile(args) {
        const audioFolder = knownFolders.currentApp().getFolder('audio');
        const recordedFile = audioFolder.getFile(`recording.${this.platformExtension()}`);
        console.log('RECORDED FILE : ' + JSON.stringify(recordedFile));
        const playerOptions: AudioPlayerOptions = {
            audioFile: `~/audio/recording.${this.platformExtension()}`,
            loop: false,
            completeCallback: async () => {
                alert('Audio file complete.');
                this.isPlaying = false;
                if (!playerOptions.loop) {
                    await this._player.dispose();
                    console.log('player disposed');
                }
            },

            errorCallback: (errorObject) => {
                console.log(JSON.stringify(errorObject));
                this.isPlaying = false;
            },

            infoCallback: (infoObject) => {
                console.log(JSON.stringify(infoObject));
                Dialogs.alert('Info callback');
            }
        };

        await this._player.playFromFile(playerOptions).catch((err) => {
            console.log('error playFromFile');
            this.isPlaying = false;
        });

        this.isPlaying = true;
    }

    /***** AUDIO PLAYER *****/

    async playAudio(filepath: string, fileType: string) {
        try {
            const playerOptions: AudioPlayerOptions = {
                audioFile: filepath,
                loop: false,
                completeCallback: async () => {
                    alert('Audio file complete.');
                    await this._player.dispose();
                    this.isPlaying = false;
                    console.log('player disposed');
                },
                errorCallback: (errorObject) => {
                    console.log(JSON.stringify(errorObject));
                    this.isPlaying = false;
                },
                infoCallback: (args) => {
                    Dialogs.alert('Info callback: ' + args.info);
                    console.log(JSON.stringify(args));
                }
            };

            this.isPlaying = true;

            if (fileType === 'localFile') {
                await this._player.playFromFile(playerOptions).catch(() => {
                    this.isPlaying = false;
                });
                this.isPlaying = true;
                this.audioTrackDuration = await this._player.getAudioTrackDuration();
                // start audio duration tracking
                this._startDurationTracking(this.audioTrackDuration);
                this._startVolumeTracking();
            } else if (fileType === 'remoteFile') {
                await this._player.playFromUrl(playerOptions).catch(() => {
                    this.isPlaying = false;
                });
                this.isPlaying = true;
            }
        } catch (ex) {
            console.log(ex);
        }
    }

    /**
     * PLAY REMOTE AUDIO FILE
     */
    playRemoteFile(args) {
        console.log('playRemoteFile');
        const filepath = 'http://www.noiseaddicts.com/samples_1w72b820/2514.mp3';

        this.playAudio(filepath, 'remoteFile');
    }

    resumePlayer() {
        console.log(JSON.stringify(this._player));
        this._player.resume();
    }

    /**
     * PLAY LOCAL AUDIO FILE from app folder
     */
    playLocalFile(args) {
        const filepath = '~/audio/angel.mp3';
        this.playAudio(filepath, 'localFile');
    }

    /**
     * PAUSE PLAYING
     */
    async pauseAudio(args) {
        try {
            await this._player.pause();
            this.isPlaying = false;
        } catch (error) {
            console.log(error);
            this.isPlaying = true;
        }
    }

    async stopPlaying(args) {
        await this._player.dispose();
        Dialogs.alert('Media Player Disposed.');
    }

    /**
     * RESUME PLAYING
     */
    resumePlaying(args) {
        console.log('START');
        this._player.play();
    }

    muteTap() {
        this.currentVolume = this._player.volume;
        this._player.volume = 0;
    }

    unmuteTap() {
        this._player.volume = 0.2;
    }

    skipTo8() {
        this._player.seekTo(8);
    }

    playSpeed1() {
        this._player.changePlayerSpeed(1);
    }

    playSpeed15() {
        this._player.changePlayerSpeed(1.5);
    }

    playSpeed2() {
        this._player.changePlayerSpeed(2);
    }

    platformExtension() {
        // 'mp3'
        return `${Application.android ? 'm4a' : 'caf'}`;
    }

    async _startDurationTracking(duration) {
        if (this._player && this._player.isAudioPlaying()) {
            const timerId = Utils.setInterval(() => {
                this.remainingDuration = duration - this._player.currentTime;
                // console.log(`this.remainingDuration = ${this.remainingDuration}`);
            }, 1000);
        }
    }

    _startVolumeTracking() {
        if (this._player) {
            const timerId = Utils.setInterval(() => {
                console.log('volume tracking', this._player.volume);
                this.currentVolume = this._player.volume;
            }, 2000);
        }
    }
}
</script>

<style lang="scss" scoped></style>
