/// <reference path="android-declarations.d.ts"/>

declare module com {
	export module kailashdabhi {
		export module omrecorder {
			export abstract class AbstractRecorder extends java.lang.Object implements com.kailashdabhi.omrecorder.Recorder {
				public static class: java.lang.Class<com.kailashdabhi.omrecorder.AbstractRecorder>;
				public pullTransport: com.kailashdabhi.omrecorder.PullTransport;
				public file: java.io.File;
				public resumeRecording(): void;
				public startRecording(): void;
				public pauseRecording(): void;
				public constructor(param0: com.kailashdabhi.omrecorder.PullTransport, param1: java.io.File);
				public stopRecording(): void;
			}
		}
	}
}

declare module com {
	export module kailashdabhi {
		export module omrecorder {
			export class AudioChunk extends java.lang.Object {
				public static class: java.lang.Class<com.kailashdabhi.omrecorder.AudioChunk>;
				/**
				 * Constructs a new instance of the com.kailashdabhi.omrecorder.AudioChunk interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
				 */
				public constructor(implementation: {
					maxAmplitude(): number;
					toBytes(): androidNative.Array<number>;
					toShorts(): androidNative.Array<number>;
					readCount(): number;
					readCount(param0: number): void;
				});
				public constructor();
				public maxAmplitude(): number;
				public readCount(param0: number): void;
				public toBytes(): androidNative.Array<number>;
				public toShorts(): androidNative.Array<number>;
				public readCount(): number;
			}
			export module AudioChunk {
				export class Bytes extends java.lang.Object implements com.kailashdabhi.omrecorder.AudioChunk {
					public static class: java.lang.Class<com.kailashdabhi.omrecorder.AudioChunk.Bytes>;
					public toBytes(): androidNative.Array<number>;
					public readCount(param0: number): void;
					public readCount(): number;
					public toShorts(): androidNative.Array<number>;
					public maxAmplitude(): number;
				}
				export class Shorts extends java.lang.Object implements com.kailashdabhi.omrecorder.AudioChunk {
					public static class: java.lang.Class<com.kailashdabhi.omrecorder.AudioChunk.Shorts>;
					public toBytes(): androidNative.Array<number>;
					public readCount(param0: number): void;
					public readCount(): number;
					public toShorts(): androidNative.Array<number>;
					public maxAmplitude(): number;
				}
			}
		}
	}
}

declare module com {
	export module kailashdabhi {
		export module omrecorder {
			export class AudioRecordConfig extends java.lang.Object {
				public static class: java.lang.Class<com.kailashdabhi.omrecorder.AudioRecordConfig>;
				/**
				 * Constructs a new instance of the com.kailashdabhi.omrecorder.AudioRecordConfig interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
				 */
				public constructor(implementation: {
					channelPositionMask(): number;
					audioSource(): number;
					frequency(): number;
					audioEncoding(): number;
					bitsPerSample(): number;
				});
				public constructor();
				public audioSource(): number;
				public bitsPerSample(): number;
				public channelPositionMask(): number;
				public audioEncoding(): number;
				public frequency(): number;
			}
			export module AudioRecordConfig {
				export class Default extends java.lang.Object implements com.kailashdabhi.omrecorder.AudioRecordConfig {
					public static class: java.lang.Class<com.kailashdabhi.omrecorder.AudioRecordConfig.Default>;
					public constructor(param0: number, param1: number, param2: number, param3: number);
					public bitsPerSample(): number;
					public audioSource(): number;
					public audioEncoding(): number;
					public channelPositionMask(): number;
					public frequency(): number;
				}
			}
		}
	}
}

declare module com {
	export module kailashdabhi {
		export module omrecorder {
			export class BuildConfig extends java.lang.Object {
				public static class: java.lang.Class<com.kailashdabhi.omrecorder.BuildConfig>;
				public static DEBUG: boolean;
				public static LIBRARY_PACKAGE_NAME: string;
				public static BUILD_TYPE: string;
				public constructor();
			}
		}
	}
}

declare module com {
	export module kailashdabhi {
		export module omrecorder {
			export class MinimumBufferSize extends java.lang.Object {
				public static class: java.lang.Class<com.kailashdabhi.omrecorder.MinimumBufferSize>;
			}
		}
	}
}

declare module com {
	export module kailashdabhi {
		export module omrecorder {
			export class OmRecorder extends java.lang.Object {
				public static class: java.lang.Class<com.kailashdabhi.omrecorder.OmRecorder>;
				public static wav(param0: com.kailashdabhi.omrecorder.PullTransport, param1: java.io.File): com.kailashdabhi.omrecorder.Recorder;
				public static pcm(param0: com.kailashdabhi.omrecorder.PullTransport, param1: java.io.File): com.kailashdabhi.omrecorder.Recorder;
			}
		}
	}
}

declare module com {
	export module kailashdabhi {
		export module omrecorder {
			export class Pcm extends com.kailashdabhi.omrecorder.AbstractRecorder {
				public static class: java.lang.Class<com.kailashdabhi.omrecorder.Pcm>;
				public resumeRecording(): void;
				public startRecording(): void;
				public pauseRecording(): void;
				public constructor(param0: com.kailashdabhi.omrecorder.PullTransport, param1: java.io.File);
				public stopRecording(): void;
			}
		}
	}
}

declare module com {
	export module kailashdabhi {
		export module omrecorder {
			export class PullTransport extends java.lang.Object {
				public static class: java.lang.Class<com.kailashdabhi.omrecorder.PullTransport>;
				/**
				 * Constructs a new instance of the com.kailashdabhi.omrecorder.PullTransport interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
				 */
				public constructor(implementation: {
					start(param0: java.io.OutputStream): void;
					stop(): void;
					pullableSource(): com.kailashdabhi.omrecorder.PullableSource;
				});
				public constructor();
				public start(param0: java.io.OutputStream): void;
				public stop(): void;
				public pullableSource(): com.kailashdabhi.omrecorder.PullableSource;
			}
			export module PullTransport {
				export abstract class AbstractPullTransport extends java.lang.Object implements com.kailashdabhi.omrecorder.PullTransport {
					public static class: java.lang.Class<com.kailashdabhi.omrecorder.PullTransport.AbstractPullTransport>;
					public start(param0: java.io.OutputStream): void;
					public stop(): void;
					public pullableSource(): com.kailashdabhi.omrecorder.PullableSource;
				}
				export class Default extends com.kailashdabhi.omrecorder.PullTransport.AbstractPullTransport {
					public static class: java.lang.Class<com.kailashdabhi.omrecorder.PullTransport.Default>;
					public start(param0: java.io.OutputStream): void;
					public constructor(param0: com.kailashdabhi.omrecorder.PullableSource, param1: com.kailashdabhi.omrecorder.PullTransport.OnAudioChunkPulledListener, param2: com.kailashdabhi.omrecorder.WriteAction);
					public constructor(param0: com.kailashdabhi.omrecorder.PullableSource, param1: com.kailashdabhi.omrecorder.WriteAction);
					public stop(): void;
					public constructor(param0: com.kailashdabhi.omrecorder.PullableSource, param1: com.kailashdabhi.omrecorder.PullTransport.OnAudioChunkPulledListener);
					public pullableSource(): com.kailashdabhi.omrecorder.PullableSource;
					public constructor(param0: com.kailashdabhi.omrecorder.PullableSource);
				}
				export class Noise extends com.kailashdabhi.omrecorder.PullTransport.AbstractPullTransport {
					public static class: java.lang.Class<com.kailashdabhi.omrecorder.PullTransport.Noise>;
					public constructor(param0: com.kailashdabhi.omrecorder.PullableSource, param1: com.kailashdabhi.omrecorder.PullTransport.OnAudioChunkPulledListener, param2: com.kailashdabhi.omrecorder.WriteAction, param3: com.kailashdabhi.omrecorder.Recorder.OnSilenceListener, param4: number);
					public constructor(param0: com.kailashdabhi.omrecorder.PullableSource, param1: com.kailashdabhi.omrecorder.Recorder.OnSilenceListener, param2: number);
					public start(param0: java.io.OutputStream): void;
					public stop(): void;
					public pullableSource(): com.kailashdabhi.omrecorder.PullableSource;
					public constructor(param0: com.kailashdabhi.omrecorder.PullableSource, param1: com.kailashdabhi.omrecorder.WriteAction, param2: com.kailashdabhi.omrecorder.Recorder.OnSilenceListener, param3: number);
					public constructor(param0: com.kailashdabhi.omrecorder.PullableSource, param1: com.kailashdabhi.omrecorder.PullTransport.OnAudioChunkPulledListener, param2: com.kailashdabhi.omrecorder.Recorder.OnSilenceListener, param3: number);
					public constructor(param0: com.kailashdabhi.omrecorder.PullableSource, param1: com.kailashdabhi.omrecorder.Recorder.OnSilenceListener);
					public constructor(param0: com.kailashdabhi.omrecorder.PullableSource);
				}
				export class OnAudioChunkPulledListener extends java.lang.Object {
					public static class: java.lang.Class<com.kailashdabhi.omrecorder.PullTransport.OnAudioChunkPulledListener>;
					/**
					 * Constructs a new instance of the com.kailashdabhi.omrecorder.PullTransport$OnAudioChunkPulledListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						onAudioChunkPulled(param0: com.kailashdabhi.omrecorder.AudioChunk): void;
					});
					public constructor();
					public onAudioChunkPulled(param0: com.kailashdabhi.omrecorder.AudioChunk): void;
				}
			}
		}
	}
}

declare module com {
	export module kailashdabhi {
		export module omrecorder {
			export class PullableSource extends java.lang.Object implements com.kailashdabhi.omrecorder.Source {
				public static class: java.lang.Class<com.kailashdabhi.omrecorder.PullableSource>;
				/**
				 * Constructs a new instance of the com.kailashdabhi.omrecorder.PullableSource interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
				 */
				public constructor(implementation: {
					pullSizeInBytes(): number;
					isEnableToBePulled(param0: boolean): void;
					isEnableToBePulled(): boolean;
					preparedToBePulled(): globalAndroid.media.AudioRecord;
					audioRecord(): globalAndroid.media.AudioRecord;
					config(): com.kailashdabhi.omrecorder.AudioRecordConfig;
					minimumBufferSize(): number;
				});
				public constructor();
				public preparedToBePulled(): globalAndroid.media.AudioRecord;
				public audioRecord(): globalAndroid.media.AudioRecord;
				public minimumBufferSize(): number;
				public pullSizeInBytes(): number;
				public isEnableToBePulled(param0: boolean): void;
				public isEnableToBePulled(): boolean;
				public config(): com.kailashdabhi.omrecorder.AudioRecordConfig;
			}
			export module PullableSource {
				export class AutomaticGainControl extends com.kailashdabhi.omrecorder.PullableSource.Base {
					public static class: java.lang.Class<com.kailashdabhi.omrecorder.PullableSource.AutomaticGainControl>;
					public pullSizeInBytes(): number;
					public isEnableToBePulled(): boolean;
					public constructor(param0: com.kailashdabhi.omrecorder.PullableSource);
					public isEnableToBePulled(param0: boolean): void;
					public preparedToBePulled(): globalAndroid.media.AudioRecord;
				}
				export class Base extends java.lang.Object implements com.kailashdabhi.omrecorder.PullableSource {
					public static class: java.lang.Class<com.kailashdabhi.omrecorder.PullableSource.Base>;
					public config(): com.kailashdabhi.omrecorder.AudioRecordConfig;
					public audioRecord(): globalAndroid.media.AudioRecord;
					public pullSizeInBytes(): number;
					public isEnableToBePulled(): boolean;
					public minimumBufferSize(): number;
					public isEnableToBePulled(param0: boolean): void;
					public preparedToBePulled(): globalAndroid.media.AudioRecord;
				}
				export class Default extends com.kailashdabhi.omrecorder.Source.Default implements com.kailashdabhi.omrecorder.PullableSource {
					public static class: java.lang.Class<com.kailashdabhi.omrecorder.PullableSource.Default>;
					public config(): com.kailashdabhi.omrecorder.AudioRecordConfig;
					public audioRecord(): globalAndroid.media.AudioRecord;
					public constructor(param0: com.kailashdabhi.omrecorder.AudioRecordConfig);
					public pullSizeInBytes(): number;
					public isEnableToBePulled(): boolean;
					public constructor(param0: com.kailashdabhi.omrecorder.AudioRecordConfig, param1: number);
					public minimumBufferSize(): number;
					public isEnableToBePulled(param0: boolean): void;
					public preparedToBePulled(): globalAndroid.media.AudioRecord;
				}
				export class NoiseSuppressor extends com.kailashdabhi.omrecorder.PullableSource.Base {
					public static class: java.lang.Class<com.kailashdabhi.omrecorder.PullableSource.NoiseSuppressor>;
					public pullSizeInBytes(): number;
					public isEnableToBePulled(): boolean;
					public constructor(param0: com.kailashdabhi.omrecorder.PullableSource);
					public isEnableToBePulled(param0: boolean): void;
					public preparedToBePulled(): globalAndroid.media.AudioRecord;
				}
			}
		}
	}
}

declare module com {
	export module kailashdabhi {
		export module omrecorder {
			export class Recorder extends java.lang.Object {
				public static class: java.lang.Class<com.kailashdabhi.omrecorder.Recorder>;
				/**
				 * Constructs a new instance of the com.kailashdabhi.omrecorder.Recorder interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
				 */
				public constructor(implementation: {
					startRecording(): void;
					stopRecording(): void;
					pauseRecording(): void;
					resumeRecording(): void;
				});
				public constructor();
				public resumeRecording(): void;
				public startRecording(): void;
				public pauseRecording(): void;
				public stopRecording(): void;
			}
			export module Recorder {
				export class OnSilenceListener extends java.lang.Object {
					public static class: java.lang.Class<com.kailashdabhi.omrecorder.Recorder.OnSilenceListener>;
					/**
					 * Constructs a new instance of the com.kailashdabhi.omrecorder.Recorder$OnSilenceListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						onSilence(param0: number): void;
					});
					public constructor();
					public onSilence(param0: number): void;
				}
			}
		}
	}
}

declare module com {
	export module kailashdabhi {
		export module omrecorder {
			export class Source extends java.lang.Object {
				public static class: java.lang.Class<com.kailashdabhi.omrecorder.Source>;
				/**
				 * Constructs a new instance of the com.kailashdabhi.omrecorder.Source interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
				 */
				public constructor(implementation: {
					audioRecord(): globalAndroid.media.AudioRecord;
					config(): com.kailashdabhi.omrecorder.AudioRecordConfig;
					minimumBufferSize(): number;
				});
				public constructor();
				public audioRecord(): globalAndroid.media.AudioRecord;
				public minimumBufferSize(): number;
				public config(): com.kailashdabhi.omrecorder.AudioRecordConfig;
			}
			export module Source {
				export class Default extends java.lang.Object implements com.kailashdabhi.omrecorder.Source {
					public static class: java.lang.Class<com.kailashdabhi.omrecorder.Source.Default>;
					public config(): com.kailashdabhi.omrecorder.AudioRecordConfig;
					public audioRecord(): globalAndroid.media.AudioRecord;
					public minimumBufferSize(): number;
				}
			}
		}
	}
}

declare module com {
	export module kailashdabhi {
		export module omrecorder {
			export class ThreadAction extends java.lang.Object {
				public static class: java.lang.Class<com.kailashdabhi.omrecorder.ThreadAction>;
				/**
				 * Constructs a new instance of the com.kailashdabhi.omrecorder.ThreadAction interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
				 */
				public constructor(implementation: {
					execute(param0: java.lang.Runnable): void;
				});
				public constructor();
				public execute(param0: java.lang.Runnable): void;
			}
		}
	}
}

declare module com {
	export module kailashdabhi {
		export module omrecorder {
			export class UiThread extends java.lang.Object implements com.kailashdabhi.omrecorder.ThreadAction {
				public static class: java.lang.Class<com.kailashdabhi.omrecorder.UiThread>;
				public execute(param0: java.lang.Runnable): void;
			}
		}
	}
}

declare module com {
	export module kailashdabhi {
		export module omrecorder {
			export class Wav extends com.kailashdabhi.omrecorder.AbstractRecorder {
				public static class: java.lang.Class<com.kailashdabhi.omrecorder.Wav>;
				public resumeRecording(): void;
				public startRecording(): void;
				public pauseRecording(): void;
				public constructor(param0: com.kailashdabhi.omrecorder.PullTransport, param1: java.io.File);
				public stopRecording(): void;
			}
		}
	}
}

declare module com {
	export module kailashdabhi {
		export module omrecorder {
			export class WavHeader extends java.lang.Object {
				public static class: java.lang.Class<com.kailashdabhi.omrecorder.WavHeader>;
				public toBytes(): androidNative.Array<number>;
			}
		}
	}
}

declare module com {
	export module kailashdabhi {
		export module omrecorder {
			export class WriteAction extends java.lang.Object {
				public static class: java.lang.Class<com.kailashdabhi.omrecorder.WriteAction>;
				/**
				 * Constructs a new instance of the com.kailashdabhi.omrecorder.WriteAction interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
				 */
				public constructor(implementation: {
					execute(param0: com.kailashdabhi.omrecorder.AudioChunk, param1: java.io.OutputStream): void;
				});
				public constructor();
				public execute(param0: com.kailashdabhi.omrecorder.AudioChunk, param1: java.io.OutputStream): void;
			}
			export module WriteAction {
				export class Default extends java.lang.Object implements com.kailashdabhi.omrecorder.WriteAction {
					public static class: java.lang.Class<com.kailashdabhi.omrecorder.WriteAction.Default>;
					public constructor();
					public execute(param0: com.kailashdabhi.omrecorder.AudioChunk, param1: java.io.OutputStream): void;
				}
			}
		}
	}
}

//Generics information:

