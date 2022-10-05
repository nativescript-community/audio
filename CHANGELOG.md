# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [6.3.1](https://github.com/farfromrefug/nativescript-audio/compare/v6.3.0...v6.3.1) (2022-10-05)


### Bug Fixes

* **android:** default sampleRate fix ([deec1a0](https://github.com/farfromrefug/nativescript-audio/commit/deec1a0533660514728b629a77f0d9007d2c3251))





# [6.3.0](https://github.com/farfromrefug/nativescript-audio/compare/v6.2.11...v6.3.0) (2022-09-16)


### Features

* **android:** support for wav recording ([fdbf720](https://github.com/farfromrefug/nativescript-audio/commit/fdbf72075fe82f9705ace173042cc656eb097308))





## [6.2.11](https://github.com/farfromrefug/nativescript-audio/compare/v6.2.10...v6.2.11) (2022-05-06)

**Note:** Version bump only for package @akylas/nativescript-audio





## [6.2.10](https://github.com/farfromrefug/nativescript-audio/compare/v6.2.9...v6.2.10) (2022-05-06)


### Bug Fixes

* android native api-usage ([cd84c7f](https://github.com/farfromrefug/nativescript-audio/commit/cd84c7f4d6b2f1d72de730b712611c50b293d311))
* event fixes ([5103f5f](https://github.com/farfromrefug/nativescript-audio/commit/5103f5f9ed59306ba0aab78b79f0764c87cfdc54))





## [6.2.9](https://github.com/farfromrefug/nativescript-audio/compare/v6.2.8...v6.2.9) (2022-02-08)


### Bug Fixes

* **ios:** fixes for `sessionMode` ([93e0608](https://github.com/farfromrefug/nativescript-audio/commit/93e060868d1eddf337d5884cd3e53b85889c10a5))





## [6.2.8](https://github.com/farfromrefug/nativescript-audio/compare/v6.2.7...v6.2.8) (2022-02-07)


### Bug Fixes

* **ios:** audio session fixes ([d139190](https://github.com/farfromrefug/nativescript-audio/commit/d139190825f9d9004b48b6ab24fbb1a733cbfe67))





## 6.2.7 (2022-02-07)


### Bug Fixes

* android release ([72d559f](https://github.com/farfromrefug/nativescript-audio/commit/72d559f1e7e64debfedb5886420f1f01047d1773))
* **android:** fix AudioFocusDurationHint enum ([#192](https://github.com/farfromrefug/nativescript-audio/issues/192)) ([0aee89e](https://github.com/farfromrefug/nativescript-audio/commit/0aee89e446a8ffb1282686d5949059ebdbef664a))
* **Android:** guard against undefined player instance ([42b9541](https://github.com/farfromrefug/nativescript-audio/commit/42b95412348c179a371ecfb052a176abf453c06e))
* **iOS:** player init error handling ([56d0392](https://github.com/farfromrefug/nativescript-audio/commit/56d039224af46956eb05e179a4bff4bb4eb47421))
* package ([a1a9c0f](https://github.com/farfromrefug/nativescript-audio/commit/a1a9c0f0826a59cbabd63c38bcef77316b469f6e))
* ts issues during build ([#23](https://github.com/farfromrefug/nativescript-audio/issues/23)) ([662d2aa](https://github.com/farfromrefug/nativescript-audio/commit/662d2aa24c30062421cd5500f1241a6d76dc2027))
* update package.json to allow webpack bundling ([7c1a45a](https://github.com/farfromrefug/nativescript-audio/commit/7c1a45acd059daa8015d1d622532d45b2d3705d9))


### Features

* added ability to enable metering for Player on iOS ([d708473](https://github.com/farfromrefug/nativescript-audio/commit/d70847397c5e2f020a924bc68ce67d8820482b1e))
* android recorder metering ([8804366](https://github.com/farfromrefug/nativescript-audio/commit/880436684974a3c2e58c8220040b5d9b20187296))
* Android recorder reuse ([a72907b](https://github.com/farfromrefug/nativescript-audio/commit/a72907bc1c109369eb7a9f9f5558e9d7ff6188f4))
* Android recorder reuse ([193ebed](https://github.com/farfromrefug/nativescript-audio/commit/193ebed77a3fa2c83a5fa0c4e410f814c652337c))
* Android recorder reuse ([5cfbc4d](https://github.com/farfromrefug/nativescript-audio/commit/5cfbc4d945d43bc0add5d019d92c2836c14130a9))
* **android:** better focus management between multiple players ([#191](https://github.com/farfromrefug/nativescript-audio/issues/191)) ([f92853b](https://github.com/farfromrefug/nativescript-audio/commit/f92853ba623bfc0b9625cd8e274df3007dcbfb51))
* **android:** pitch option ([#183](https://github.com/farfromrefug/nativescript-audio/issues/183)) ([7edaf4f](https://github.com/farfromrefug/nativescript-audio/commit/7edaf4f92b7f60f4993524023101d7ac61c68414))
* compatibility with snapshot ([ddf249a](https://github.com/farfromrefug/nativescript-audio/commit/ddf249a22dd34af7a9c148df77c406cfe11d1ee6))
* iOS/Android seekTo added. ([a0b3a3a](https://github.com/farfromrefug/nativescript-audio/commit/a0b3a3ad114754427ba9cc5c2d083d86c84c2a9e))
* **iOS:** Player using AVAudioPlayer, Recorder using AVAudioRecorder ([302164e](https://github.com/farfromrefug/nativescript-audio/commit/302164e8d642b0b4592e649f8fd4d750e5c48e8c))
* **ios:** sessionMode, sessionCategory and sessionRouteSharingPolicy for iOS ([f952093](https://github.com/farfromrefug/nativescript-audio/commit/f9520934be29667941adb23a908e3b8c5576899c))
* **iOS:** support for playAtTime + getter for actual native player instance ([0a269b2](https://github.com/farfromrefug/nativescript-audio/commit/0a269b2e653041b945ada73f9dea5459b4f2b75b))
* new init methods to reuse players, cleanup around auto dispose on iOS ([1958f9c](https://github.com/farfromrefug/nativescript-audio/commit/1958f9c1020c6f8a78e3e814f6f8c4deac644eae))
* **Player:** ability to set and get volume for iOS/Android ([4b46ea3](https://github.com/farfromrefug/nativescript-audio/commit/4b46ea318be0a4b4f8069346a2a1b0cc184834ab))
* recorder options for Android ([6256df9](https://github.com/farfromrefug/nativescript-audio/commit/6256df929c3c3b19326829f1e82a842bfce83c0e))
* recorder options for Android ([b76e6bc](https://github.com/farfromrefug/nativescript-audio/commit/b76e6bc0210c2a61078703c55be4d9e2ed8be186))
* request audio focus for api > 28 ([#177](https://github.com/farfromrefug/nativescript-audio/issues/177)) ([d4176bb](https://github.com/farfromrefug/nativescript-audio/commit/d4176bb35090b15c92ed17d369745c3a20f54abe))
