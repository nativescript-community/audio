<!-- ⚠️ This README has been generated from the file(s) "blueprint.md" ⚠️--><!-- ⚠️ This README has been generated from the file(s) "blueprint.md" ⚠️-->
<!--  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      DO NOT EDIT THIS READEME DIRECTLY! Edit "bluesprint.md" instead.
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! -->
<h1 align="center">@nativescript-community/audio</h1>
<p align="center">
		<a href="https://npmcharts.com/compare/@nativescript-community/audio?minimal=true"><img alt="Downloads per month" src="https://img.shields.io/npm/dm/@nativescript-community/audio.svg" height="20"/></a>
<a href="https://www.npmjs.com/package/@nativescript-community/audio"><img alt="NPM Version" src="https://img.shields.io/npm/v/@nativescript-community/audio.svg" height="20"/></a>
	</p>

<p align="center">
  <b>NativeScript plugin to record and play audio.</b></br>
  <sub><sub>
</p>

<br />


| <img src="https://raw.githubusercontent.com/nativescript-community/audio/master/images/demo-ios.gif" height="500" /> | <img src="https://raw.githubusercontent.com/nativescript-community/audio/master/images/demo-android.gif" height="500" /> |
| --- | ----------- |
| iOS Demo | Android Demo |


[](#table-of-contents)


[](#table-of-contents)

## Table of Contents

* [Installation](#installation)
* [Installation](#installation-1)
	* [Android Native Classes](#android-native-classes)
	* [iOS Native Classes](#ios-native-classes)
	* [Permissions](#permissions)
		* [iOS](#ios)
		* [Android](#android)
* [Usage](#usage)
	* [TypeScript Example](#typescript-example)
	* [Javascript Example:](#javascript-example)
* [API](#api)
	* [Recorder](#recorder)
		* [TNSRecorder Methods](#tnsrecorder-methods)
		* [TNSRecorder Instance Properties](#tnsrecorder-instance-properties)
	* [Player](#player)
		* [TNSPlayer Methods](#tnsplayer-methods)
		* [TNSPlayer Instance Properties](#tnsplayer-instance-properties)
	* [License](#license)
* [Demos and Development](#demos-and-development)
	* [Repo Setup](#repo-setup)
	* [Build](#build)
	* [Demos](#demos)
* [Contributing](#contributing)
	* [Update repo ](#update-repo-)
	* [Update readme ](#update-readme-)
	* [Update doc ](#update-doc-)
	* [Publish](#publish)
	* [modifying submodules](#modifying-submodules)
* [Questions](#questions)


[](#installation)


[](#installation)

## Installation
Run the following command from the root of your project:

`ns plugin add @nativescript-community/audio`


[](#installation)


[](#installation)

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


[](#usage)


[](#usage)

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


[](#api)


[](#api)

## API

### Recorder

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


[](#demos-and-development)


[](#demos-and-development)

## Demos and Development


### Repo Setup

The repo uses submodules. If you did not clone with ` --recursive` then you need to call
```
git submodule update --init
```

The package manager used to install and link dependencies must be `pnpm` or `yarn`. `npm` wont work.

To develop and test:
if you use `yarn` then run `yarn`
if you use `pnpm` then run `pnpm i`

**Interactive Menu:**

To start the interactive menu, run `npm start` (or `yarn start` or `pnpm start`). This will list all of the commonly used scripts.

### Build

```bash
npm run build.all
```
WARNING: it seems `yarn build.all` wont always work (not finding binaries in `node_modules/.bin`) which is why the doc explicitly uses `npm run`

### Demos

```bash
npm run demo.[ng|react|svelte|vue].[ios|android]

npm run demo.svelte.ios # Example
```

Demo setup is a bit special in the sense that if you want to modify/add demos you dont work directly in `demo-[ng|react|svelte|vue]`
Instead you work in `demo-snippets/[ng|react|svelte|vue]`
You can start from the `install.ts` of each flavor to see how to register new demos 


[](#contributing)


[](#contributing)

## Contributing

### Update repo 

You can update the repo files quite easily

First update the submodules

```bash
npm run update
```

Then commit the changes
Then update common files

```bash
npm run sync
```
Then you can run `yarn|pnpm`, commit changed files if any

### Update readme 
```bash
npm run readme
```

### Update doc 
```bash
npm run doc
```

### Publish

The publishing is completely handled by `lerna` (you can add `-- --bump major` to force a major release)
Simply run 
```shell
npm run publish
```

### modifying submodules

The repo uses https:// for submodules which means you won't be able to push directly into the submodules.
One easy solution is t modify `~/.gitconfig` and add
```
[url "ssh://git@github.com/"]
	pushInsteadOf = https://github.com/
```


[](#questions)


[](#questions)

## Questions

If you have any questions/issues/comments please feel free to create an issue or start a conversation in the [NativeScript Community Discord](https://nativescript.org/discord).

[](#demos-and-development)

## Demos and Development


### Repo Setup

The repo uses submodules. If you did not clone with ` --recursive` then you need to call
```
git submodule update --init
```

The package manager used to install and link dependencies must be `pnpm` or `yarn`. `npm` wont work.

To develop and test:
if you use `yarn` then run `yarn`
if you use `pnpm` then run `pnpm i`

**Interactive Menu:**

To start the interactive menu, run `npm start` (or `yarn start` or `pnpm start`). This will list all of the commonly used scripts.

### Build

```bash
npm run build.all
```
WARNING: it seems `yarn build.all` wont always work (not finding binaries in `node_modules/.bin`) which is why the doc explicitly uses `npm run`

### Demos

```bash
npm run demo.[ng|react|svelte|vue].[ios|android]

npm run demo.svelte.ios # Example
```

Demo setup is a bit special in the sense that if you want to modify/add demos you dont work directly in `demo-[ng|react|svelte|vue]`
Instead you work in `demo-snippets/[ng|react|svelte|vue]`
You can start from the `install.ts` of each flavor to see how to register new demos 


[](#contributing)

## Contributing

### Update repo 

You can update the repo files quite easily

First update the submodules

```bash
npm run update
```

Then commit the changes
Then update common files

```bash
npm run sync
```
Then you can run `yarn|pnpm`, commit changed files if any

### Update readme 
```bash
npm run readme
```

### Update doc 
```bash
npm run doc
```

### Publish

The publishing is completely handled by `lerna` (you can add `-- --bump major` to force a major release)
Simply run 
```shell
npm run publish
```

### modifying submodules

The repo uses https:// for submodules which means you won't be able to push directly into the submodules.
One easy solution is t modify `~/.gitconfig` and add
```
[url "ssh://git@github.com/"]
	pushInsteadOf = https://github.com/
```

[](#questions)

## Questions

If you have any questions/issues/comments please feel free to create an issue or start a conversation in the [NativeScript Community Discord](https://nativescript.org/discord).