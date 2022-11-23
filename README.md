# NativeScript Audio

[![npm](https://img.shields.io/npm/v/@nativescript-community/audio.svg)](https://www.npmjs.com/package/@nativescript-community/audio)
[![npm downloads](https://img.shields.io/npm/dm/@nativescript-community/audio.svg)](https://www.npmjs.com/package/@nativescript-community/audio)
[![npm downloads](https://img.shields.io/npm/dt/@nativescript-community/audio.svg)](https://www.npmjs.com/package/@nativescript-community/audio)

| <img src="images/demo-ios.gif" height="500" /> | <img src="images/demo-android.gif" height="500" /> |
| --- | ----------- |
| iOS Demo | Android Demo |

---
## Table of Contents
1. [Installation](#installation)
2. [Permissions](#permissions)
3. [Usage](#usage)
4. [API](#api)
5. [Demos and Development](#demos-and-development)

## Installation

```
ns plugin add @nativescript-community/audio
```

---

### Android Native Classes

- [Player - android.media.MediaPlayer](http://developer.android.com/reference/android/media/MediaPlayer.html)
- [Recorder - android.media.MediaRecorder](http://developer.android.com/reference/android/media/MediaRecorder.html)

### iOS Native Classes

- [Player - AVAudioPlayer](https://developer.apple.com/library/ios/documentation/AVFoundation/Reference/AVAudioPlayerClassReference/)
- [Recorder - AVAudioRecorder](https://developer.apple.com/library/ios/documentation/AVFoundation/Reference/AVAudioRecorder_ClassReference/)


### Permissions

#### iOS

You will need to grant permissions on iOS to allow the device to access the microphone if you are using the recording function. If you don't, your app may crash on device and/or your app might be rejected during Apple's review routine. To do this, add this key to your `app/App_Resources/iOS/Info.plist` file:

```xml
<key>NSMicrophoneUsageDescription</key>
<string>Recording Practice Sessions</string>
```

#### Android

If you are going to use the recorder capability for Android, you need to add the RECORD_AUDIO permission to your AndroidManifest.xml file located in App_Resources.

```xml
    <uses-permission android:name="android.permission.RECORD_AUDIO"/>
```

## Usage

### TypeScript Example

```typescript
import { TNSPlayer } from '@nativescript-community/audio';

export class YourClass {
  private _player: TNSPlayer;

  constructor() {
    this._player = new TNSPlayer();
    // You can pass a duration hint to control the behavior of other application that may
    // be holding audio focus.
    // For example: new  TNSPlayer(AudioFocusDurationHint.AUDIOFOCUS_GAIN_TRANSIENT);
    // Then when you play a song, the previous owner of the
    // audio focus will stop. When your song stops
    // the previous holder will resume.
    this._player.debug = true; // set true to enable TNSPlayer console logs for debugging.
    this._player
      .initFromFile({
        audioFile: '~/audio/song.mp3', // ~ = app directory
        loop: false,
        completeCallback: this._trackComplete.bind(this),
        errorCallback: this._trackError.bind(this)
      })
      .then(() => {
        this._player.getAudioTrackDuration().then(duration => {
          // iOS: duration is in seconds
          // Android: duration is in milliseconds
          console.log(`song duration:`, duration);
        });
      });
  }

  public togglePlay() {
    if (this._player.isAudioPlaying()) {
      this._player.pause();
    } else {
      this._player.play();
    }
  }

  private _trackComplete(args: any) {
    console.log('reference back to player:', args.player);
    // iOS only: flag indicating if completed succesfully
    console.log('whether song play completed successfully:', args.flag);
  }

  private _trackError(args: any) {
    console.log('reference back to player:', args.player);
    console.log('the error:', args.error);
    // Android only: extra detail on error
    console.log('extra info on the error:', args.extra);
  }
}
```

### Javascript Example:

```javascript
const audio = require('@nativescript-community/audio');

const player = new audio.TNSPlayer();
const playerOptions = {
  audioFile: 'http://some/audio/file.mp3',
  loop: false,
  completeCallback: function () {
    console.log('finished playing');
  },
  errorCallback: function (errorObject) {
    console.log(JSON.stringify(errorObject));
  },
  infoCallback: function (args) {
    console.log(JSON.stringify(args));
  }
};

player
  .playFromUrl(playerOptions)
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log('something went wrong...', err);
  });
```

## API

### Recorder

On Android if you want to record PCM you need to use `ANDROID_ENCODER_PCM_16 | ` exported by this plugin for the `encoder` option
While using PCM `infoCallback`, `errorCallback` and `_getMeters` are not used on Android

#### TNSRecorder Methods

| Method                                                      | Description                                                              |
| ----------------------------------------------------------- | ------------------------------------------------------------------------ |
| _TNSRecorder.CAN_RECORD()_: `boolean` - **_static method_** | Determine if ready to record.                                            |
| _start(options: AudioRecorderOptions)_: `Promise<void>`     | Start recording to file.                                                 |
| _stop()_: `Promise<void>`                                   | Stop recording.                                                          |
| _pause()_: `Promise<void>`                                  | Pause recording.                                                         |
| _resume()_: `Promise<void>`                                 | Resume recording.                                                        |
| _dispose()_: `Promise<void>`                                | Free up system resources when done with recorder.                        |
| _getMeters(channel?: number)_: `number`                     | Returns the amplitude of the input.                                      |
| _isRecording()_: `boolean` - **_iOS Only_**                 | Returns true if recorder is actively recording.                          |
| _requestRecordPermission()_: `Promise<void>`                | _Android Only_ Resolves the promise is user grants the permission.       |
| _hasRecordPermission()_: `boolean`                          | _Android Only_ Returns true if RECORD_AUDIO permission has been granted. |

```ts
interface AudioRecorderOptions {
    /**
     * The name of the file recorded.
     */
    filename: string;

    /**
     * The audio source to record *** ANDROID ONLY for now ***
     * https://developer.android.com/reference/android/media/MediaRecorder.AudioSource.html
     */
    source?: any;

    /**
     * The max duration of the audio recording.
     */
    maxDuration?: number;

    /**
     * Set true to enable audio metering.
     */
    metering?: boolean;

    /**
     * The format of the audio recording.
     */
    format?: any;
    channels?: any;
    sampleRate?: any;
    bitRate?: any;

    /**
     * Android: encoder format (android.media.MediaRecorder.AudioEncoder | ANDROID_ENCODER_PCM_16 | ANDROID_ENCODER_PCM_8)
     * https://developer.android.com/reference/android/media/MediaRecorder.AudioEncoder
     */
    encoder?: any;

    /**
     * Callback to execute when playback has an error.
     * @returns {Object} An object containing the native values for the error callback.
     */
    errorCallback?: Function;

    /**
     * Callback to execute when info is emitted from the player.
     * @returns {Object} An object containing the native values for the info callback.
     */
    infoCallback?: Function;
}
```

#### TNSRecorder Instance Properties

| Property | Description                                                |
| -------- | ---------------------------------------------------------- |
| ios      | Get the native AVAudioRecorder class instance.             |
| android  | Get the native MediaRecorder class instance.               |
| debug    | Set true to enable debugging console logs (default false). |

### Player

#### TNSPlayer Methods

| Method                                                                 | Description                                                  |
| ---------------------------------------------------------------------- | ------------------------------------------------------------ |
| _initFromFile(options: AudioPlayerOptions)_: `Promise`                 | Initialize player instance with a file without auto-playing. |
| _playFromFile(options: AudioPlayerOptions)_: `Promise`                 | Auto-play from a file.                                       |
| _initFromUrl(options: AudioPlayerOptions)_: `Promise`                  | Initialize player instance from a url without auto-playing.  |
| _playFromUrl(options: AudioPlayerOptions)_: `Promise`                  | Auto-play from a url.                                        |
| _pause()_: `Promise<boolean>`                                          | Pause playback.                                              |
| _resume()_: `void`                                                     | Resume playback.                                             |
| _seekTo(time:number)_: `Promise<boolean>`                              | Seek to position of track (in seconds).                      |
| _dispose()_: `Promise<boolean>`                                        | Free up resources when done playing audio.                   |
| _isAudioPlaying()_: `boolean`                                          | Determine if player is playing.                              |
| _getAudioTrackDuration()_: `Promise<string>`                           | Duration of media file assigned to the player.               |
| _playAtTime(time: number)_: void - **_iOS Only_**                      | Play audio track at specific time of duration.               |
| _changePlayerSpeed(speed: number)_: void - **On Android Only API 23+** | Change the playback speed of the media player.               |

```ts
interface AudioPlayerOptions {
    /**
     * The audio file to play.
     */
    audioFile: string;

    /**
     * Set true to loop audio playback.
     */
    loop: boolean;

    /**
     * Prevent autoplay if desired as player autoplays be default
     */
    autoPlay?: boolean;

    /**
     * Set true to enable audio metering.
     */
    metering?: boolean;

    pitch?: number;

    /**
     * Callback to execute when playback has completed.
     * @returns {Object} An object containing the native values for the callback.
     */
    completeCallback?: Function;

    /**
     * Callback to execute when playback has an error.
     * @returns {Object} An object containing the native values for the error callback.
     */
    errorCallback?: Function;

    /**
     * Callback to execute when info is emitted from the player.
     * @returns {Object} An object containing the native values for the info callback.
     */
    infoCallback?: Function;

    /**
     * Should mix audio.
     */
    audioMixing?: boolean;

    /**
     * iOS: The category for playing recorded music or other sounds that are central to the successful use of your app.
     *  https://developer.apple.com/documentation/avfaudio/avaudiosessioncategory?language=objc
     */
    sessionCategory?: string;

    /**
     * iOS: Audio session mode identifiers.
     * https://developer.apple.com/documentation/avfaudio/avaudiosessionmode
     */
    sessionMode?: string;

    /**
     * iOS: Cases that indicate the possible route-sharing policies for an audio session.
     * https://developer.apple.com/documentation/avfaudio/avaudiosessionroutesharingpolicy
     */
    sessionRouteSharingPolicy?: AVAudioSessionRouteSharingPolicy;
}
```
#### TNSPlayer Instance Properties

| Property                | Description                                                |
| ----------------------- | ---------------------------------------------------------- |
| _ios_                   | Get the native ios AVAudioPlayer instance.                 |
| _android_               | Get the native android MediaPlayer instance.               |
| _debug_: `boolean`      | Set true to enable debugging console logs (default false). |
| _currentTime_: `number` | Get the current time in the media file's duration.         |
| _volume_: `number`      | Get/Set the player volume. Value range from 0 to 1.        |

### License

[MIT](/LICENSE)

## Demos and Development

To run the demos, you must clone this repo **recursively**.

```
git clone https://github.com/nativescript-community/audio.git --recursive
```

### Install Dependencies:
```bash
npm i # or 'yarn install' or 'pnpm install'
```

### Interactive Menu:
To start the interactive menu, run `npm start` (or `yarn start` or `pnpm start`). This will list all of the commonly used scripts.

### Building Plugin:
```bash
npm run build
```

### Running Demos:
```bash
npm run demo.[vue].[ios|android]

# Example:
npm run demo.svelte.ios
```