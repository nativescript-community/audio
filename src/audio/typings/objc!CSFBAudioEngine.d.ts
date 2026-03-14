
declare class SFBAttachedPicture extends NSObject implements NSCopying {

	static alloc(): SFBAttachedPicture; // inherited from NSObject

	static new(): SFBAttachedPicture; // inherited from NSObject

	readonly dictionaryRepresentation: NSDictionary<string, any>;

	readonly imageData: NSData;

	readonly pictureDescription: string;

	readonly pictureType: SFBAttachedPictureType;

	constructor(o: { dictionaryRepresentation: NSDictionary<string, any>; });

	constructor(o: { imageData: NSData; });

	constructor(o: { imageData: NSData; type: SFBAttachedPictureType; });

	constructor(o: { imageData: NSData; type: SFBAttachedPictureType; description: string; });

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	initWithDictionaryRepresentation(dictionaryRepresentation: NSDictionary<string, any>): this;

	initWithImageData(imageData: NSData): this;

	initWithImageDataType(imageData: NSData, type: SFBAttachedPictureType): this;

	initWithImageDataTypeDescription(imageData: NSData, type: SFBAttachedPictureType, description: string): this;
}

declare var SFBAttachedPictureKeyDescription: string;

declare var SFBAttachedPictureKeyImageData: string;

declare var SFBAttachedPictureKeyType: string;

declare const enum SFBAttachedPictureType {

	Other = 0,

	FileIcon = 1,

	OtherFileIcon = 2,

	FrontCover = 3,

	BackCover = 4,

	LeafletPage = 5,

	Media = 6,

	LeadArtist = 7,

	Artist = 8,

	Conductor = 9,

	Band = 10,

	Composer = 11,

	Lyricist = 12,

	RecordingLocation = 13,

	DuringRecording = 14,

	DuringPerformance = 15,

	MovieScreenCapture = 16,

	ColouredFish = 17,

	Illustration = 18,

	BandLogo = 19,

	PublisherLogo = 20
}

declare class SFBAudioConverter extends NSObject {

	static alloc(): SFBAudioConverter; // inherited from NSObject

	static convertFromDecoderToURLError(decoder: SFBPCMDecoding, destinationURL: NSURL, error?: interop.Reference<NSError>): boolean;

	static convertFromDecoderUsingEncoderError(decoder: SFBPCMDecoding, encoder: SFBPCMEncoding, error?: interop.Reference<NSError>): boolean;

	static convertFromURLToURLError(sourceURL: NSURL, destinationURL: NSURL, error?: interop.Reference<NSError>): boolean;

	static convertFromURLUsingEncoderError(sourceURL: NSURL, encoder: SFBPCMEncoding, error?: interop.Reference<NSError>): boolean;

	static new(): SFBAudioConverter; // inherited from NSObject

	readonly decoder: SFBPCMDecoding;

	readonly encoder: SFBPCMEncoding;

	readonly intermediateConverter: AVAudioConverter;

	constructor(o: { decoder: SFBPCMDecoding; destinationURL: NSURL; });

	constructor(o: { decoder: SFBPCMDecoding; destinationURL: NSURL; });

	constructor(o: { decoder: SFBPCMDecoding; encoder: SFBPCMEncoding; });

	constructor(o: { decoder: SFBPCMDecoding; encoder: SFBPCMEncoding; });

	constructor(o: { decoder: SFBPCMDecoding; encoder: SFBPCMEncoding; requestedIntermediateFormat: (p1: AVAudioFormat) => AVAudioFormat; });

	constructor(o: { URL: NSURL; destinationURL: NSURL; });

	constructor(o: { URL: NSURL; destinationURL: NSURL; });

	constructor(o: { URL: NSURL; encoder: SFBPCMEncoding; });

	constructor(o: { URL: NSURL; encoder: SFBPCMEncoding; });

	convertReturningError(error?: interop.Reference<NSError>): boolean;

	initWithDecoderDestinationURL(decoder: SFBPCMDecoding, destinationURL: NSURL): this;

	initWithDecoderDestinationURLError(decoder: SFBPCMDecoding, destinationURL: NSURL, error?: interop.Reference<NSError>): this;

	initWithDecoderEncoder(decoder: SFBPCMDecoding, encoder: SFBPCMEncoding): this;

	initWithDecoderEncoderError(decoder: SFBPCMDecoding, encoder: SFBPCMEncoding, error?: interop.Reference<NSError>): this;

	initWithDecoderEncoderRequestedIntermediateFormatError(decoder: SFBPCMDecoding, encoder: SFBPCMEncoding, intermediateFormatBlock: (p1: AVAudioFormat) => AVAudioFormat, error?: interop.Reference<NSError>): this;

	initWithURLDestinationURL(sourceURL: NSURL, destinationURL: NSURL): this;

	initWithURLDestinationURLError(sourceURL: NSURL, destinationURL: NSURL, error?: interop.Reference<NSError>): this;

	initWithURLEncoder(sourceURL: NSURL, encoder: SFBPCMEncoding): this;

	initWithURLEncoderError(sourceURL: NSURL, encoder: SFBPCMEncoding, error?: interop.Reference<NSError>): this;
}

declare const enum SFBAudioConverterErrorCode {

	FormatNotSupported = 0
}

declare var SFBAudioConverterErrorDomain: string;

declare class SFBAudioDecoder extends NSObject implements SFBPCMDecoding {

	static alloc(): SFBAudioDecoder; // inherited from NSObject

	static handlesMIMEType(mimeType: string): boolean;

	static handlesPathsWithExtension(extension: string): boolean;

	static new(): SFBAudioDecoder; // inherited from NSObject

	static readonly supportedMIMETypes: NSSet<string>;

	static readonly supportedPathExtensions: NSSet<string>;

	readonly decodingIsLossless: boolean; // inherited from SFBAudioDecoding

	readonly frameLength: number; // inherited from SFBPCMDecoding

	readonly framePosition: number; // inherited from SFBPCMDecoding

	readonly inputSource: SFBInputSource; // inherited from SFBAudioDecoding

	readonly isOpen: boolean; // inherited from SFBAudioDecoding

	readonly processingFormat: AVAudioFormat; // inherited from SFBAudioDecoding

	readonly properties: NSDictionary<string, any>; // inherited from SFBAudioDecoding

	readonly sourceFormat: AVAudioFormat; // inherited from SFBAudioDecoding

	readonly supportsSeeking: boolean; // inherited from SFBAudioDecoding

	constructor(o: { inputSource: SFBInputSource; });

	constructor(o: { inputSource: SFBInputSource; decoderName: string; });

	constructor(o: { inputSource: SFBInputSource; decoderName: string; });

	constructor(o: { inputSource: SFBInputSource; detectContentType: boolean; });

	constructor(o: { inputSource: SFBInputSource; detectContentType: boolean; mimeTypeHint: string; });

	constructor(o: { inputSource: SFBInputSource; });

	constructor(o: { inputSource: SFBInputSource; mimeTypeHint: string; });

	constructor(o: { URL: NSURL; });

	constructor(o: { URL: NSURL; decoderName: string; });

	constructor(o: { URL: NSURL; decoderName: string; });

	constructor(o: { URL: NSURL; detectContentType: boolean; });

	constructor(o: { URL: NSURL; detectContentType: boolean; mimeTypeHint: string; });

	constructor(o: { URL: NSURL; });

	constructor(o: { URL: NSURL; mimeTypeHint: string; });

	closeReturningError(error?: interop.Reference<NSError>): boolean;

	decodeIntoBufferError(buffer: AVAudioBuffer, error?: interop.Reference<NSError>): boolean;

	decodeIntoBufferFrameLengthError(buffer: AVAudioPCMBuffer, frameLength: number, error?: interop.Reference<NSError>): boolean;

	initWithInputSource(inputSource: SFBInputSource): this;

	initWithInputSourceDecoderName(inputSource: SFBInputSource, decoderName: string): this;

	initWithInputSourceDecoderNameError(inputSource: SFBInputSource, decoderName: string, error?: interop.Reference<NSError>): this;

	initWithInputSourceDetectContentTypeError(inputSource: SFBInputSource, detectContentType: boolean, error?: interop.Reference<NSError>): this;

	initWithInputSourceDetectContentTypeMimeTypeHintError(inputSource: SFBInputSource, detectContentType: boolean, mimeTypeHint: string, error?: interop.Reference<NSError>): this;

	initWithInputSourceError(inputSource: SFBInputSource, error?: interop.Reference<NSError>): this;

	initWithInputSourceMimeTypeHintError(inputSource: SFBInputSource, mimeTypeHint: string, error?: interop.Reference<NSError>): this;

	initWithURL(url: NSURL): this;

	initWithURLDecoderName(url: NSURL, decoderName: string): this;

	initWithURLDecoderNameError(url: NSURL, decoderName: string, error?: interop.Reference<NSError>): this;

	initWithURLDetectContentTypeError(url: NSURL, detectContentType: boolean, error?: interop.Reference<NSError>): this;

	initWithURLDetectContentTypeMimeTypeHintError(url: NSURL, detectContentType: boolean, mimeTypeHint: string, error?: interop.Reference<NSError>): this;

	initWithURLError(url: NSURL, error?: interop.Reference<NSError>): this;

	initWithURLMimeTypeHintError(url: NSURL, mimeTypeHint: string, error?: interop.Reference<NSError>): this;

	openReturningError(error?: interop.Reference<NSError>): boolean;

	seekToFrameError(frame: number, error?: interop.Reference<NSError>): boolean;
}

declare const enum SFBAudioDecoderErrorCode {

	InternalError = 0,

	UnknownDecoder = 1,

	InvalidFormat = 2
}

declare var SFBAudioDecoderErrorDomain: string;

declare var SFBAudioDecoderNameCoreAudio: string;

declare var SFBAudioDecoderNameFLAC: string;

declare var SFBAudioDecoderNameLibsndfile: string;

declare var SFBAudioDecoderNameMPEG: string;

declare var SFBAudioDecoderNameModule: string;

declare var SFBAudioDecoderNameMonkeysAudio: string;

declare var SFBAudioDecoderNameMusepack: string;

declare var SFBAudioDecoderNameOggFLAC: string;

declare var SFBAudioDecoderNameOggOpus: string;

declare var SFBAudioDecoderNameOggSpeex: string;

declare var SFBAudioDecoderNameOggVorbis: string;

declare var SFBAudioDecoderNameShorten: string;

declare var SFBAudioDecoderNameTrueAudio: string;

declare var SFBAudioDecoderNameWavPack: string;

interface SFBAudioDecoding {

	decodingIsLossless: boolean;

	inputSource: SFBInputSource;

	isOpen: boolean;

	processingFormat: AVAudioFormat;

	properties: NSDictionary<string, any>;

	sourceFormat: AVAudioFormat;

	supportsSeeking: boolean;

	closeReturningError(error?: interop.Reference<NSError>): boolean;

	decodeIntoBufferError(buffer: AVAudioBuffer, error?: interop.Reference<NSError>): boolean;

	openReturningError(error?: interop.Reference<NSError>): boolean;
}
declare var SFBAudioDecoding: {

	prototype: SFBAudioDecoding;
};

declare var SFBAudioDecodingPropertiesKeyFLACBitsPerSample: string;

declare var SFBAudioDecodingPropertiesKeyFLACChannels: string;

declare var SFBAudioDecodingPropertiesKeyFLACMD5Sum: string;

declare var SFBAudioDecodingPropertiesKeyFLACMaximumBlockSize: string;

declare var SFBAudioDecodingPropertiesKeyFLACMaximumFrameSize: string;

declare var SFBAudioDecodingPropertiesKeyFLACMinimumBlockSize: string;

declare var SFBAudioDecodingPropertiesKeyFLACMinimumFrameSize: string;

declare var SFBAudioDecodingPropertiesKeyFLACSampleRate: string;

declare var SFBAudioDecodingPropertiesKeyFLACTotalSamples: string;

declare var SFBAudioDecodingPropertiesKeyMonkeysAudioAPETotalBytes: string;

declare var SFBAudioDecodingPropertiesKeyMonkeysAudioAPL: string;

declare var SFBAudioDecodingPropertiesKeyMonkeysAudioAverageBitrate: string;

declare var SFBAudioDecodingPropertiesKeyMonkeysAudioBitsPerSample: string;

declare var SFBAudioDecodingPropertiesKeyMonkeysAudioBlockAlignment: string;

declare var SFBAudioDecodingPropertiesKeyMonkeysAudioBlocksPerFrame: string;

declare var SFBAudioDecodingPropertiesKeyMonkeysAudioBytesPerSample: string;

declare var SFBAudioDecodingPropertiesKeyMonkeysAudioChannels: string;

declare var SFBAudioDecodingPropertiesKeyMonkeysAudioCompressionLevel: string;

declare var SFBAudioDecodingPropertiesKeyMonkeysAudioDecompressedBitrate: string;

declare var SFBAudioDecodingPropertiesKeyMonkeysAudioFileVersion: string;

declare var SFBAudioDecodingPropertiesKeyMonkeysAudioFinalFrameBlocks: string;

declare var SFBAudioDecodingPropertiesKeyMonkeysAudioFormatFlags: string;

declare var SFBAudioDecodingPropertiesKeyMonkeysAudioLengthMilliseconds: string;

declare var SFBAudioDecodingPropertiesKeyMonkeysAudioSampleRate: string;

declare var SFBAudioDecodingPropertiesKeyMonkeysAudioTotalBlocks: string;

declare var SFBAudioDecodingPropertiesKeyMonkeysAudioTotalFrames: string;

declare var SFBAudioDecodingPropertiesKeyMonkeysAudioWAVDataBytes: string;

declare var SFBAudioDecodingPropertiesKeyMonkeysAudioWAVHeaderBytes: string;

declare var SFBAudioDecodingPropertiesKeyMonkeysAudioWAVTerminatingBytes: string;

declare var SFBAudioDecodingPropertiesKeyMonkeysAudioWAVTotalBytes: string;

declare var SFBAudioDecodingPropertiesKeyMusepackAlbumGain: string;

declare var SFBAudioDecodingPropertiesKeyMusepackAlbumPeak: string;

declare var SFBAudioDecodingPropertiesKeyMusepackAverageBitrate: string;

declare var SFBAudioDecodingPropertiesKeyMusepackBeginningSilence: string;

declare var SFBAudioDecodingPropertiesKeyMusepackBitrate: string;

declare var SFBAudioDecodingPropertiesKeyMusepackBlockPower: string;

declare var SFBAudioDecodingPropertiesKeyMusepackChannels: string;

declare var SFBAudioDecodingPropertiesKeyMusepackEncoder: string;

declare var SFBAudioDecodingPropertiesKeyMusepackEncoderVersion: string;

declare var SFBAudioDecodingPropertiesKeyMusepackHeaderPosition: string;

declare var SFBAudioDecodingPropertiesKeyMusepackIsTrueGapless: string;

declare var SFBAudioDecodingPropertiesKeyMusepackMaximumBandIndex: string;

declare var SFBAudioDecodingPropertiesKeyMusepackMidSideStereo: string;

declare var SFBAudioDecodingPropertiesKeyMusepackPNS: string;

declare var SFBAudioDecodingPropertiesKeyMusepackProfile: string;

declare var SFBAudioDecodingPropertiesKeyMusepackProfileName: string;

declare var SFBAudioDecodingPropertiesKeyMusepackSampleFrequency: string;

declare var SFBAudioDecodingPropertiesKeyMusepackSamples: string;

declare var SFBAudioDecodingPropertiesKeyMusepackStreamVersion: string;

declare var SFBAudioDecodingPropertiesKeyMusepackTagOffset: string;

declare var SFBAudioDecodingPropertiesKeyMusepackTitleGain: string;

declare var SFBAudioDecodingPropertiesKeyMusepackTitlePeak: string;

declare var SFBAudioDecodingPropertiesKeyMusepackTotalFileLength: string;

declare var SFBAudioDecodingPropertiesKeyOggOpusChannelCount: string;

declare var SFBAudioDecodingPropertiesKeyOggOpusCoupledCount: string;

declare var SFBAudioDecodingPropertiesKeyOggOpusInputSampleRate: string;

declare var SFBAudioDecodingPropertiesKeyOggOpusMapping: string;

declare var SFBAudioDecodingPropertiesKeyOggOpusMappingFamily: string;

declare var SFBAudioDecodingPropertiesKeyOggOpusOutputGain: string;

declare var SFBAudioDecodingPropertiesKeyOggOpusPreSkip: string;

declare var SFBAudioDecodingPropertiesKeyOggOpusStreamCount: string;

declare var SFBAudioDecodingPropertiesKeyOggOpusVersion: string;

declare var SFBAudioDecodingPropertiesKeyOggSpeexBitrate: string;

declare var SFBAudioDecodingPropertiesKeyOggSpeexExtraHeaders: string;

declare var SFBAudioDecodingPropertiesKeyOggSpeexFrameSize: string;

declare var SFBAudioDecodingPropertiesKeyOggSpeexFramesPerPacket: string;

declare var SFBAudioDecodingPropertiesKeyOggSpeexHeaderSize: string;

declare var SFBAudioDecodingPropertiesKeyOggSpeexMode: string;

declare var SFBAudioDecodingPropertiesKeyOggSpeexModeBitstreamVersion: string;

declare var SFBAudioDecodingPropertiesKeyOggSpeexNumberChannels: string;

declare var SFBAudioDecodingPropertiesKeyOggSpeexRate: string;

declare var SFBAudioDecodingPropertiesKeyOggSpeexSpeexString: string;

declare var SFBAudioDecodingPropertiesKeyOggSpeexSpeexVersion: string;

declare var SFBAudioDecodingPropertiesKeyOggSpeexSpeexVersionID: string;

declare var SFBAudioDecodingPropertiesKeyOggSpeexVBR: string;

declare var SFBAudioDecodingPropertiesKeyOggVorbisBitrateLower: string;

declare var SFBAudioDecodingPropertiesKeyOggVorbisBitrateNominal: string;

declare var SFBAudioDecodingPropertiesKeyOggVorbisBitrateUpper: string;

declare var SFBAudioDecodingPropertiesKeyOggVorbisBitrateWindow: string;

declare var SFBAudioDecodingPropertiesKeyOggVorbisChannels: string;

declare var SFBAudioDecodingPropertiesKeyOggVorbisRate: string;

declare var SFBAudioDecodingPropertiesKeyOggVorbisVersion: string;

declare var SFBAudioDecodingPropertiesKeyShortenBigEndian: string;

declare var SFBAudioDecodingPropertiesKeyShortenBitsPerSample: string;

declare var SFBAudioDecodingPropertiesKeyShortenBlockSize: string;

declare var SFBAudioDecodingPropertiesKeyShortenFileType: string;

declare var SFBAudioDecodingPropertiesKeyShortenNumberChannels: string;

declare var SFBAudioDecodingPropertiesKeyShortenSampleRate: string;

declare var SFBAudioDecodingPropertiesKeyShortenVersion: string;

declare var SFBAudioDecodingPropertiesKeyTrueAudioBitsPerSample: string;

declare var SFBAudioDecodingPropertiesKeyTrueAudioFormat: string;

declare var SFBAudioDecodingPropertiesKeyTrueAudioNumberChannels: string;

declare var SFBAudioDecodingPropertiesKeyTrueAudioSampleRate: string;

declare var SFBAudioDecodingPropertiesKeyTrueAudioSamples: string;

declare var SFBAudioDecodingPropertiesKeyWavPackBitsPerSample: string;

declare var SFBAudioDecodingPropertiesKeyWavPackBytesPerSample: string;

declare var SFBAudioDecodingPropertiesKeyWavPackChannelMask: string;

declare var SFBAudioDecodingPropertiesKeyWavPackFileFormat: string;

declare var SFBAudioDecodingPropertiesKeyWavPackFloatNormExponent: string;

declare var SFBAudioDecodingPropertiesKeyWavPackMode: string;

declare var SFBAudioDecodingPropertiesKeyWavPackNativeSampleRate: string;

declare var SFBAudioDecodingPropertiesKeyWavPackNumberChannels: string;

declare var SFBAudioDecodingPropertiesKeyWavPackNumberSamples: string;

declare var SFBAudioDecodingPropertiesKeyWavPackNumberSamplesInFrame: string;

declare var SFBAudioDecodingPropertiesKeyWavPackQualifyMode: string;

declare var SFBAudioDecodingPropertiesKeyWavPackRatio: string;

declare var SFBAudioDecodingPropertiesKeyWavPackReducedChannels: string;

declare var SFBAudioDecodingPropertiesKeyWavPackSampleRate: string;

declare var SFBAudioDecodingPropertiesKeyWavPackVersion: string;

declare var SFBAudioDecodingPropertiesKeystreamInfoMusepackFastSeek: string;

declare class SFBAudioEncoder extends NSObject implements SFBPCMEncoding {

	static alloc(): SFBAudioEncoder; // inherited from NSObject

	static handlesMIMEType(mimeType: string): boolean;

	static handlesPathsWithExtension(extension: string): boolean;

	static new(): SFBAudioEncoder; // inherited from NSObject

	static readonly supportedMIMETypes: NSSet<string>;

	static readonly supportedPathExtensions: NSSet<string>;

	readonly encodingIsLossless: boolean; // inherited from SFBAudioEncoding

	estimatedFramesToEncode: number; // inherited from SFBPCMEncoding

	readonly framePosition: number; // inherited from SFBPCMEncoding

	readonly isOpen: boolean; // inherited from SFBAudioEncoding

	readonly outputFormat: AVAudioFormat; // inherited from SFBAudioEncoding

	readonly outputSource: SFBOutputSource; // inherited from SFBAudioEncoding

	readonly processingFormat: AVAudioFormat; // inherited from SFBAudioEncoding

	settings: NSDictionary<string, any>; // inherited from SFBAudioEncoding

	readonly sourceFormat: AVAudioFormat; // inherited from SFBAudioEncoding

	constructor(o: { outputSource: SFBOutputSource; });

	constructor(o: { outputSource: SFBOutputSource; encoderName: string; });

	constructor(o: { outputSource: SFBOutputSource; encoderName: string; });

	constructor(o: { outputSource: SFBOutputSource; });

	constructor(o: { outputSource: SFBOutputSource; mimeType: string; });

	constructor(o: { URL: NSURL; });

	constructor(o: { URL: NSURL; encoderName: string; });

	constructor(o: { URL: NSURL; encoderName: string; });

	constructor(o: { URL: NSURL; });

	constructor(o: { URL: NSURL; mimeType: string; });

	closeReturningError(error?: interop.Reference<NSError>): boolean;

	encodeFromBufferError(buffer: AVAudioBuffer, error?: interop.Reference<NSError>): boolean;

	encodeFromBufferFrameLengthError(buffer: AVAudioPCMBuffer, frameLength: number, error?: interop.Reference<NSError>): boolean;

	finishEncodingReturningError(error?: interop.Reference<NSError>): boolean;

	initWithOutputSource(outputSource: SFBOutputSource): this;

	initWithOutputSourceEncoderName(outputSource: SFBOutputSource, encoderName: string): this;

	initWithOutputSourceEncoderNameError(outputSource: SFBOutputSource, encoderName: string, error?: interop.Reference<NSError>): this;

	initWithOutputSourceError(outputSource: SFBOutputSource, error?: interop.Reference<NSError>): this;

	initWithOutputSourceMimeTypeError(outputSource: SFBOutputSource, mimeType: string, error?: interop.Reference<NSError>): this;

	initWithURL(url: NSURL): this;

	initWithURLEncoderName(url: NSURL, encoderName: string): this;

	initWithURLEncoderNameError(url: NSURL, encoderName: string, error?: interop.Reference<NSError>): this;

	initWithURLError(url: NSURL, error?: interop.Reference<NSError>): this;

	initWithURLMimeTypeError(url: NSURL, mimeType: string, error?: interop.Reference<NSError>): this;

	openReturningError(error?: interop.Reference<NSError>): boolean;

	processingFormatForSourceFormat(sourceFormat: AVAudioFormat): AVAudioFormat;

	setSourceFormatError(sourceFormat: AVAudioFormat, error?: interop.Reference<NSError>): boolean;
}

declare const enum SFBAudioEncoderErrorCode {

	InternalError = 0,

	UnknownEncoder = 1,

	InvalidFormat = 2
}

declare var SFBAudioEncoderErrorDomain: string;

declare var SFBAudioEncoderNameCoreAudio: string;

declare var SFBAudioEncoderNameFLAC: string;

declare var SFBAudioEncoderNameLibsndfile: string;

declare var SFBAudioEncoderNameMP3: string;

declare var SFBAudioEncoderNameMonkeysAudio: string;

declare var SFBAudioEncoderNameMusepack: string;

declare var SFBAudioEncoderNameOggFLAC: string;

declare var SFBAudioEncoderNameOggOpus: string;

declare var SFBAudioEncoderNameOggSpeex: string;

declare var SFBAudioEncoderNameOggVorbis: string;

declare var SFBAudioEncoderNameTrueAudio: string;

declare var SFBAudioEncoderNameWavPack: string;

interface SFBAudioEncoding {

	encodingIsLossless: boolean;

	isOpen: boolean;

	outputFormat: AVAudioFormat;

	outputSource: SFBOutputSource;

	processingFormat: AVAudioFormat;

	settings: NSDictionary<string, any>;

	sourceFormat: AVAudioFormat;

	closeReturningError(error?: interop.Reference<NSError>): boolean;

	encodeFromBufferError(buffer: AVAudioBuffer, error?: interop.Reference<NSError>): boolean;

	finishEncodingReturningError(error?: interop.Reference<NSError>): boolean;

	openReturningError(error?: interop.Reference<NSError>): boolean;

	processingFormatForSourceFormat(sourceFormat: AVAudioFormat): AVAudioFormat;

	setSourceFormatError(sourceFormat: AVAudioFormat, error?: interop.Reference<NSError>): boolean;
}
declare var SFBAudioEncoding: {

	prototype: SFBAudioEncoding;
};

declare var SFBAudioEncodingSettingsKeyAPECompressionLevel: string;

declare var SFBAudioEncodingSettingsKeyCoreAudioAudioConverterPropertySettings: string;

declare var SFBAudioEncodingSettingsKeyCoreAudioBitsPerChannel: string;

declare var SFBAudioEncodingSettingsKeyCoreAudioFileTypeID: string;

declare var SFBAudioEncodingSettingsKeyCoreAudioFormatFlags: string;

declare var SFBAudioEncodingSettingsKeyCoreAudioFormatID: string;

declare var SFBAudioEncodingSettingsKeyFLACCompressionLevel: string;

declare var SFBAudioEncodingSettingsKeyFLACVerifyEncoding: string;

declare var SFBAudioEncodingSettingsKeyLibsndfileFileEndian: string;

declare var SFBAudioEncodingSettingsKeyLibsndfileMajorFormat: string;

declare var SFBAudioEncodingSettingsKeyLibsndfileSubtype: string;

declare var SFBAudioEncodingSettingsKeyMP3AverageBitrate: string;

declare var SFBAudioEncodingSettingsKeyMP3CalculateReplayGain: string;

declare var SFBAudioEncodingSettingsKeyMP3ConstantBitrate: string;

declare var SFBAudioEncodingSettingsKeyMP3Quality: string;

declare var SFBAudioEncodingSettingsKeyMP3StereoMode: string;

declare var SFBAudioEncodingSettingsKeyMP3UseVariableBitrate: string;

declare var SFBAudioEncodingSettingsKeyMP3VBRMaximumBitrate: string;

declare var SFBAudioEncodingSettingsKeyMP3VBRMinimumBitrate: string;

declare var SFBAudioEncodingSettingsKeyMP3VBRQuality: string;

declare var SFBAudioEncodingSettingsKeyMusepackQuality: string;

declare var SFBAudioEncodingSettingsKeyOpusBitrate: string;

declare var SFBAudioEncodingSettingsKeyOpusBitrateMode: string;

declare var SFBAudioEncodingSettingsKeyOpusComplexity: string;

declare var SFBAudioEncodingSettingsKeyOpusFrameDuration: string;

declare var SFBAudioEncodingSettingsKeyOpusPreserveSampleRate: string;

declare var SFBAudioEncodingSettingsKeyOpusSignalType: string;

declare var SFBAudioEncodingSettingsKeySpeexBitrate: string;

declare var SFBAudioEncodingSettingsKeySpeexComplexity: string;

declare var SFBAudioEncodingSettingsKeySpeexDenoiseInput: string;

declare var SFBAudioEncodingSettingsKeySpeexDisableHighpassFilter: string;

declare var SFBAudioEncodingSettingsKeySpeexEnableABR: string;

declare var SFBAudioEncodingSettingsKeySpeexEnableAGC: string;

declare var SFBAudioEncodingSettingsKeySpeexEnableDTX: string;

declare var SFBAudioEncodingSettingsKeySpeexEnableVAD: string;

declare var SFBAudioEncodingSettingsKeySpeexEnableVBR: string;

declare var SFBAudioEncodingSettingsKeySpeexFramesPerOggPacket: string;

declare var SFBAudioEncodingSettingsKeySpeexMode: string;

declare var SFBAudioEncodingSettingsKeySpeexQuality: string;

declare var SFBAudioEncodingSettingsKeySpeexTargetIsBitrate: string;

declare var SFBAudioEncodingSettingsKeySpeexVBRMaxBitrate: string;

declare var SFBAudioEncodingSettingsKeyVorbisBitrate: string;

declare var SFBAudioEncodingSettingsKeyVorbisMaxBitrate: string;

declare var SFBAudioEncodingSettingsKeyVorbisMinBitrate: string;

declare var SFBAudioEncodingSettingsKeyVorbisQuality: string;

declare var SFBAudioEncodingSettingsKeyVorbisTargetIsBitrate: string;

declare var SFBAudioEncodingSettingsKeyWavPackCompressionLevel: string;

declare var SFBAudioEncodingSettingsValueAPECompressionLevelExtraHigh: any;

declare var SFBAudioEncodingSettingsValueAPECompressionLevelFast: any;

declare var SFBAudioEncodingSettingsValueAPECompressionLevelHigh: any;

declare var SFBAudioEncodingSettingsValueAPECompressionLevelInsane: any;

declare var SFBAudioEncodingSettingsValueAPECompressionLevelNormal: any;

declare var SFBAudioEncodingSettingsValueLibsndfileFileEndianBig: any;

declare var SFBAudioEncodingSettingsValueLibsndfileFileEndianCPU: any;

declare var SFBAudioEncodingSettingsValueLibsndfileFileEndianDefault: any;

declare var SFBAudioEncodingSettingsValueLibsndfileFileEndianLittle: any;

declare var SFBAudioEncodingSettingsValueLibsndfileMajorFormatAIFF: any;

declare var SFBAudioEncodingSettingsValueLibsndfileMajorFormatAU: any;

declare var SFBAudioEncodingSettingsValueLibsndfileMajorFormatAVR: any;

declare var SFBAudioEncodingSettingsValueLibsndfileMajorFormatCAF: any;

declare var SFBAudioEncodingSettingsValueLibsndfileMajorFormatFLAC: any;

declare var SFBAudioEncodingSettingsValueLibsndfileMajorFormatHTK: any;

declare var SFBAudioEncodingSettingsValueLibsndfileMajorFormatIRCAM: any;

declare var SFBAudioEncodingSettingsValueLibsndfileMajorFormatMAT4: any;

declare var SFBAudioEncodingSettingsValueLibsndfileMajorFormatMAT5: any;

declare var SFBAudioEncodingSettingsValueLibsndfileMajorFormatMPC2K: any;

declare var SFBAudioEncodingSettingsValueLibsndfileMajorFormatNIST: any;

declare var SFBAudioEncodingSettingsValueLibsndfileMajorFormatOgg: any;

declare var SFBAudioEncodingSettingsValueLibsndfileMajorFormatPAF: any;

declare var SFBAudioEncodingSettingsValueLibsndfileMajorFormatPVF: any;

declare var SFBAudioEncodingSettingsValueLibsndfileMajorFormatRF64: any;

declare var SFBAudioEncodingSettingsValueLibsndfileMajorFormatRaw: any;

declare var SFBAudioEncodingSettingsValueLibsndfileMajorFormatSD2: any;

declare var SFBAudioEncodingSettingsValueLibsndfileMajorFormatSDS: any;

declare var SFBAudioEncodingSettingsValueLibsndfileMajorFormatSVX: any;

declare var SFBAudioEncodingSettingsValueLibsndfileMajorFormatVOC: any;

declare var SFBAudioEncodingSettingsValueLibsndfileMajorFormatW64: any;

declare var SFBAudioEncodingSettingsValueLibsndfileMajorFormatWAV: any;

declare var SFBAudioEncodingSettingsValueLibsndfileMajorFormatWAVEX: any;

declare var SFBAudioEncodingSettingsValueLibsndfileMajorFormatWVE: any;

declare var SFBAudioEncodingSettingsValueLibsndfileMajorFormatXI: any;

declare var SFBAudioEncodingSettingsValueLibsndfileSubtypeALAC_16: any;

declare var SFBAudioEncodingSettingsValueLibsndfileSubtypeALAC_20: any;

declare var SFBAudioEncodingSettingsValueLibsndfileSubtypeALAC_24: any;

declare var SFBAudioEncodingSettingsValueLibsndfileSubtypeALAC_32: any;

declare var SFBAudioEncodingSettingsValueLibsndfileSubtypeALAW: any;

declare var SFBAudioEncodingSettingsValueLibsndfileSubtypeDPCM_16: any;

declare var SFBAudioEncodingSettingsValueLibsndfileSubtypeDPCM_8: any;

declare var SFBAudioEncodingSettingsValueLibsndfileSubtypeDWVW_12: any;

declare var SFBAudioEncodingSettingsValueLibsndfileSubtypeDWVW_16: any;

declare var SFBAudioEncodingSettingsValueLibsndfileSubtypeDWVW_24: any;

declare var SFBAudioEncodingSettingsValueLibsndfileSubtypeDWVW_N: any;

declare var SFBAudioEncodingSettingsValueLibsndfileSubtypeDouble: any;

declare var SFBAudioEncodingSettingsValueLibsndfileSubtypeFloat: any;

declare var SFBAudioEncodingSettingsValueLibsndfileSubtypeG721_32: any;

declare var SFBAudioEncodingSettingsValueLibsndfileSubtypeG723_24: any;

declare var SFBAudioEncodingSettingsValueLibsndfileSubtypeG723_40: any;

declare var SFBAudioEncodingSettingsValueLibsndfileSubtypeGSM610: any;

declare var SFBAudioEncodingSettingsValueLibsndfileSubtypeIMA_ADPCM: any;

declare var SFBAudioEncodingSettingsValueLibsndfileSubtypeMS_ADPCM: any;

declare var SFBAudioEncodingSettingsValueLibsndfileSubtypeNMS_ADPCM_16: any;

declare var SFBAudioEncodingSettingsValueLibsndfileSubtypeNMS_ADPCM_24: any;

declare var SFBAudioEncodingSettingsValueLibsndfileSubtypeNMS_ADPCM_32: any;

declare var SFBAudioEncodingSettingsValueLibsndfileSubtypeOpus: any;

declare var SFBAudioEncodingSettingsValueLibsndfileSubtypePCM_16: any;

declare var SFBAudioEncodingSettingsValueLibsndfileSubtypePCM_24: any;

declare var SFBAudioEncodingSettingsValueLibsndfileSubtypePCM_32: any;

declare var SFBAudioEncodingSettingsValueLibsndfileSubtypePCM_S8: any;

declare var SFBAudioEncodingSettingsValueLibsndfileSubtypePCM_U8: any;

declare var SFBAudioEncodingSettingsValueLibsndfileSubtypeVOX_ADPCM: any;

declare var SFBAudioEncodingSettingsValueLibsndfileSubtypeVorbis: any;

declare var SFBAudioEncodingSettingsValueLibsndfileSubtypeµLAW: any;

declare var SFBAudioEncodingSettingsValueMP3StereoModeJointStereo: any;

declare var SFBAudioEncodingSettingsValueMP3StereoModeMono: any;

declare var SFBAudioEncodingSettingsValueMP3StereoModeStereo: any;

declare var SFBAudioEncodingSettingsValueOpusBitrateModeConstrainedVBR: any;

declare var SFBAudioEncodingSettingsValueOpusBitrateModeHardCBR: any;

declare var SFBAudioEncodingSettingsValueOpusBitrateModeVBR: any;

declare var SFBAudioEncodingSettingsValueOpusFrameDuration100ms: any;

declare var SFBAudioEncodingSettingsValueOpusFrameDuration10ms: any;

declare var SFBAudioEncodingSettingsValueOpusFrameDuration120ms: any;

declare var SFBAudioEncodingSettingsValueOpusFrameDuration20ms: any;

declare var SFBAudioEncodingSettingsValueOpusFrameDuration2_5ms: any;

declare var SFBAudioEncodingSettingsValueOpusFrameDuration40ms: any;

declare var SFBAudioEncodingSettingsValueOpusFrameDuration5ms: any;

declare var SFBAudioEncodingSettingsValueOpusFrameDuration60ms: any;

declare var SFBAudioEncodingSettingsValueOpusFrameDuration80ms: any;

declare var SFBAudioEncodingSettingsValueOpusSignalTypeMusic: any;

declare var SFBAudioEncodingSettingsValueOpusSignalTypeVoice: any;

declare var SFBAudioEncodingSettingsValueSpeexModeNarrowband: any;

declare var SFBAudioEncodingSettingsValueSpeexModeUltraWideband: any;

declare var SFBAudioEncodingSettingsValueSpeexModeWideband: any;

declare var SFBAudioEncodingSettingsValueWavPackCompressionLevelFast: any;

declare var SFBAudioEncodingSettingsValueWavPackCompressionLevelHigh: any;

declare var SFBAudioEncodingSettingsValueWavPackCompressionLevelVeryHigh: any;

declare var SFBAudioEngineVersionNumber: number;

declare var SFBAudioEngineVersionString: interop.Reference<number>;

declare class SFBAudioExporter extends NSObject {

	static alloc(): SFBAudioExporter; // inherited from NSObject

	static exportFromDecoderToURLError(decoder: SFBPCMDecoding, targetURL: NSURL, error?: interop.Reference<NSError>): boolean;

	static exportFromURLToURLError(sourceURL: NSURL, targetURL: NSURL, error?: interop.Reference<NSError>): boolean;

	static new(): SFBAudioExporter; // inherited from NSObject
}

declare const enum SFBAudioExporterErrorCode {

	FileFormatNotSupported = 0
}

declare var SFBAudioExporterErrorDomain: string;

declare class SFBAudioFile extends NSObject {

	static alloc(): SFBAudioFile; // inherited from NSObject

	static audioFileWithURLError(url: NSURL, error?: interop.Reference<NSError>): SFBAudioFile;

	static copyMetadataFromURLToURLError(sourceURL: NSURL, destinationURL: NSURL, error?: interop.Reference<NSError>): boolean;

	static handlesMIMEType(mimeType: string): boolean;

	static handlesPathsWithExtension(extension: string): boolean;

	static new(): SFBAudioFile; // inherited from NSObject

	metadata: SFBAudioMetadata;

	readonly properties: SFBAudioProperties;

	readonly url: NSURL;

	static readonly supportedMIMETypes: NSSet<string>;

	static readonly supportedPathExtensions: NSSet<string>;

	constructor(o: { URL: NSURL; });

	constructor(o: { URL: NSURL; detectContentType: boolean; });

	constructor(o: { URL: NSURL; detectContentType: boolean; mimeTypeHint: string; });

	constructor(o: { URL: NSURL; });

	constructor(o: { URL: NSURL; formatName: string; });

	constructor(o: { URL: NSURL; formatName: string; });

	constructor(o: { URL: NSURL; mimeTypeHint: string; });

	initWithURL(url: NSURL): this;

	initWithURLDetectContentTypeError(url: NSURL, detectContentType: boolean, error?: interop.Reference<NSError>): this;

	initWithURLDetectContentTypeMimeTypeHintError(url: NSURL, detectContentType: boolean, mimeTypeHint: string, error?: interop.Reference<NSError>): this;

	initWithURLError(url: NSURL, error?: interop.Reference<NSError>): this;

	initWithURLFormatName(url: NSURL, formatName: string): this;

	initWithURLFormatNameError(url: NSURL, formatName: string, error?: interop.Reference<NSError>): this;

	initWithURLMimeTypeHintError(url: NSURL, mimeTypeHint: string, error?: interop.Reference<NSError>): this;

	readPropertiesAndMetadataReturningError(error?: interop.Reference<NSError>): boolean;

	writeMetadataReturningError(error?: interop.Reference<NSError>): boolean;
}

declare const enum SFBAudioFileErrorCode {

	InternalError = 0,

	UnknownFormatName = 1,

	InputOutput = 2,

	InvalidFormat = 3
}

declare var SFBAudioFileErrorDomain: string;

declare var SFBAudioFileFormatNameAIFF: string;

declare var SFBAudioFileFormatNameDSDIFF: string;

declare var SFBAudioFileFormatNameDSF: string;

declare var SFBAudioFileFormatNameExtendedModule: string;

declare var SFBAudioFileFormatNameFLAC: string;

declare var SFBAudioFileFormatNameImpulseTrackerModule: string;

declare var SFBAudioFileFormatNameMP3: string;

declare var SFBAudioFileFormatNameMP4: string;

declare var SFBAudioFileFormatNameMonkeysAudio: string;

declare var SFBAudioFileFormatNameMusepack: string;

declare var SFBAudioFileFormatNameOggFLAC: string;

declare var SFBAudioFileFormatNameOggOpus: string;

declare var SFBAudioFileFormatNameOggSpeex: string;

declare var SFBAudioFileFormatNameOggVorbis: string;

declare var SFBAudioFileFormatNameProTrackerModule: string;

declare var SFBAudioFileFormatNameScreamTracker3Module: string;

declare var SFBAudioFileFormatNameShorten: string;

declare var SFBAudioFileFormatNameTrueAudio: string;

declare var SFBAudioFileFormatNameWAVE: string;

declare var SFBAudioFileFormatNameWavPack: string;

declare class SFBAudioMetadata extends NSObject implements NSCopying {

	static alloc(): SFBAudioMetadata; // inherited from NSObject

	static new(): SFBAudioMetadata; // inherited from NSObject

	additionalMetadata: NSDictionary<any, any>;

	albumArtist: string;

	albumArtistSortOrder: string;

	albumTitle: string;

	albumTitleSortOrder: string;

	artist: string;

	artistSortOrder: string;

	readonly attachedPictures: NSSet<SFBAttachedPicture>;

	bpm: number;

	comment: string;

	compilation: number;

	composer: string;

	composerSortOrder: string;

	readonly dictionaryRepresentation: NSDictionary<string, any>;

	discNumber: number;

	discTotal: number;

	genre: string;

	genreSortOrder: string;

	grouping: string;

	isrc: string;

	lyrics: string;

	mcn: string;

	musicBrainzRecordingID: string;

	musicBrainzReleaseID: string;

	rating: number;

	releaseDate: string;

	replayGainAlbumGain: number;

	replayGainAlbumPeak: number;

	replayGainReferenceLoudness: number;

	replayGainTrackGain: number;

	replayGainTrackPeak: number;

	title: string;

	titleSortOrder: string;

	trackNumber: number;

	trackTotal: number;

	constructor(o: { dictionaryRepresentation: NSDictionary<string, any>; });

	attachPicture(picture: SFBAttachedPicture): void;

	attachedPicturesOfType(type: SFBAttachedPictureType): NSArray<SFBAttachedPicture>;

	copyAttachedPicturesFrom(metadata: SFBAudioMetadata): void;

	copyMetadataFrom(metadata: SFBAudioMetadata): void;

	copyMetadataOfKindFrom(kind: SFBAudioMetadataKind, metadata: SFBAudioMetadata): void;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	initWithDictionaryRepresentation(dictionaryRepresentation: NSDictionary<string, any>): this;

	objectForKey(key: string): any;

	objectForKeyedSubscript(key: string): any;

	removeAll(): void;

	removeAllAttachedPictures(): void;

	removeAllMetadata(): void;

	removeAttachedPicture(picture: SFBAttachedPicture): void;

	removeAttachedPicturesOfType(type: SFBAttachedPictureType): void;

	removeMetadataOfKind(kind: SFBAudioMetadataKind): void;

	removeObjectForKey(key: string): void;

	setFromDictionaryRepresentation(dictionary: NSDictionary<string, any>): void;

	setObjectForKey(obj: any, key: string): void;

	setObjectForKeyedSubscript(obj: any, key: string): void;
}

declare var SFBAudioMetadataKeyAdditionalMetadata: string;

declare var SFBAudioMetadataKeyAlbumArtist: string;

declare var SFBAudioMetadataKeyAlbumArtistSortOrder: string;

declare var SFBAudioMetadataKeyAlbumTitle: string;

declare var SFBAudioMetadataKeyAlbumTitleSortOrder: string;

declare var SFBAudioMetadataKeyArtist: string;

declare var SFBAudioMetadataKeyArtistSortOrder: string;

declare var SFBAudioMetadataKeyAttachedPictures: string;

declare var SFBAudioMetadataKeyBPM: string;

declare var SFBAudioMetadataKeyComment: string;

declare var SFBAudioMetadataKeyCompilation: string;

declare var SFBAudioMetadataKeyComposer: string;

declare var SFBAudioMetadataKeyComposerSortOrder: string;

declare var SFBAudioMetadataKeyDiscNumber: string;

declare var SFBAudioMetadataKeyDiscTotal: string;

declare var SFBAudioMetadataKeyGenre: string;

declare var SFBAudioMetadataKeyGenreSortOrder: string;

declare var SFBAudioMetadataKeyGrouping: string;

declare var SFBAudioMetadataKeyISRC: string;

declare var SFBAudioMetadataKeyLyrics: string;

declare var SFBAudioMetadataKeyMCN: string;

declare var SFBAudioMetadataKeyMusicBrainzRecordingID: string;

declare var SFBAudioMetadataKeyMusicBrainzReleaseID: string;

declare var SFBAudioMetadataKeyRating: string;

declare var SFBAudioMetadataKeyReleaseDate: string;

declare var SFBAudioMetadataKeyReplayGainAlbumGain: string;

declare var SFBAudioMetadataKeyReplayGainAlbumPeak: string;

declare var SFBAudioMetadataKeyReplayGainReferenceLoudness: string;

declare var SFBAudioMetadataKeyReplayGainTrackGain: string;

declare var SFBAudioMetadataKeyReplayGainTrackPeak: string;

declare var SFBAudioMetadataKeyTitle: string;

declare var SFBAudioMetadataKeyTitleSortOrder: string;

declare var SFBAudioMetadataKeyTrackNumber: string;

declare var SFBAudioMetadataKeyTrackTotal: string;

declare const enum SFBAudioMetadataKind {

	Basic = 1,

	Sorting = 2,

	Grouping = 4,

	Additional = 8,

	ReplayGain = 16
}

declare class SFBAudioPlayer extends NSObject implements SFBAudioPlayerNodeDelegate {

	static alloc(): SFBAudioPlayer; // inherited from NSObject

	static new(): SFBAudioPlayer; // inherited from NSObject

	readonly currentDecoder: SFBPCMDecoding;

	readonly currentTime: number;

	delegate: SFBAudioPlayerDelegate;

	readonly engineIsRunning: boolean;

	readonly frameLength: number;

	readonly framePosition: number;

	readonly isPaused: boolean;

	readonly isPlaying: boolean;

	readonly isReady: boolean;

	readonly isStopped: boolean;

	readonly nowPlaying: SFBPCMDecoding;

	readonly playbackPosition: SFBPlaybackPosition;

	readonly playbackState: SFBAudioPlayerPlaybackState;

	readonly playbackTime: SFBPlaybackTime;

	readonly playerNode: SFBAudioPlayerNode;

	readonly playerNodeIsPlaying: boolean;

	readonly queueIsEmpty: boolean;

	readonly supportsSeeking: boolean;

	readonly totalTime: number;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	audioPlayerNodeDecoderCanceledFramesRendered(audioPlayerNode: SFBAudioPlayerNode, decoder: SFBPCMDecoding, framesRendered: number): void;

	audioPlayerNodeDecodingComplete(audioPlayerNode: SFBAudioPlayerNode, decoder: SFBPCMDecoding): void;

	audioPlayerNodeDecodingStarted(audioPlayerNode: SFBAudioPlayerNode, decoder: SFBPCMDecoding): void;

	audioPlayerNodeEncounteredError(audioPlayerNode: SFBAudioPlayerNode, error: NSError): void;

	audioPlayerNodeRenderingDecoderWillChangeToDecoderAtHostTime(audioPlayerNode: SFBAudioPlayerNode, decoder: SFBPCMDecoding, nextDecoder: SFBPCMDecoding, hostTime: number): void;

	audioPlayerNodeRenderingWillCompleteAtHostTime(audioPlayerNode: SFBAudioPlayerNode, decoder: SFBPCMDecoding, hostTime: number): void;

	audioPlayerNodeRenderingWillStartAtHostTime(audioPlayerNode: SFBAudioPlayerNode, decoder: SFBPCMDecoding, hostTime: number): void;

	class(): typeof NSObject;

	clearQueue(): void;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	enqueueDecoderError(decoder: SFBPCMDecoding, error?: interop.Reference<NSError>): boolean;

	enqueueDecoderForImmediatePlaybackError(decoder: SFBPCMDecoding, forImmediatePlayback: boolean, error?: interop.Reference<NSError>): boolean;

	enqueueURLError(url: NSURL, error?: interop.Reference<NSError>): boolean;

	enqueueURLForImmediatePlaybackError(url: NSURL, forImmediatePlayback: boolean, error?: interop.Reference<NSError>): boolean;

	formatWillBeGaplessIfEnqueued(format: AVAudioFormat): boolean;

	getPlaybackPositionAndTime(playbackPosition: interop.Pointer | interop.Reference<SFBPlaybackPosition>, playbackTime: interop.Pointer | interop.Reference<SFBPlaybackTime>): boolean;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	logProcessingGraphDescriptionType(log: NSObject & OS_os_log, type: os_log_type_t): void;

	pause(): void;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	playDecoderError(decoder: SFBPCMDecoding, error?: interop.Reference<NSError>): boolean;

	playReturningError(error?: interop.Reference<NSError>): boolean;

	playURLError(url: NSURL, error?: interop.Reference<NSError>): boolean;

	reset(): void;

	respondsToSelector(aSelector: string): boolean;

	resume(): void;

	retainCount(): number;

	seekBackward(): boolean;

	seekForward(): boolean;

	seekToFrame(frame: number): boolean;

	seekToPosition(position: number): boolean;

	seekToTime(timeInSeconds: number): boolean;

	self(): this;

	stop(): void;

	togglePlayPauseReturningError(error?: interop.Reference<NSError>): boolean;

	withEngine(block: (p1: AVAudioEngine) => void): void;
}

interface SFBAudioPlayerDelegate extends NSObjectProtocol {

	audioPlayerAVAudioEngineConfigurationChange?(audioPlayer: SFBAudioPlayer): void;

	audioPlayerDecoderCanceledFramesRendered?(audioPlayer: SFBAudioPlayer, decoder: SFBPCMDecoding, framesRendered: number): void;

	audioPlayerDecodingComplete?(audioPlayer: SFBAudioPlayer, decoder: SFBPCMDecoding): void;

	audioPlayerDecodingStarted?(audioPlayer: SFBAudioPlayer, decoder: SFBPCMDecoding): void;

	audioPlayerEncounteredError?(audioPlayer: SFBAudioPlayer, error: NSError): void;

	audioPlayerEndOfAudio?(audioPlayer: SFBAudioPlayer): void;

	audioPlayerNowPlayingChangedPreviouslyPlaying?(audioPlayer: SFBAudioPlayer, nowPlaying: SFBPCMDecoding, previouslyPlaying: SFBPCMDecoding): void;

	audioPlayerPlaybackStateChanged?(audioPlayer: SFBAudioPlayer, playbackState: SFBAudioPlayerPlaybackState): void;

	audioPlayerReconfigureProcessingGraphWithFormat?(audioPlayer: SFBAudioPlayer, engine: AVAudioEngine, format: AVAudioFormat): AVAudioNode;

	audioPlayerRenderingComplete?(audioPlayer: SFBAudioPlayer, decoder: SFBPCMDecoding): void;

	audioPlayerRenderingStarted?(audioPlayer: SFBAudioPlayer, decoder: SFBPCMDecoding): void;

	audioPlayerRenderingWillCompleteAtHostTime?(audioPlayer: SFBAudioPlayer, decoder: SFBPCMDecoding, hostTime: number): void;

	audioPlayerRenderingWillStartAtHostTime?(audioPlayer: SFBAudioPlayer, decoder: SFBPCMDecoding, hostTime: number): void;
}
declare var SFBAudioPlayerDelegate: {

	prototype: SFBAudioPlayerDelegate;
};

declare class SFBAudioPlayerNode extends AVAudioSourceNode {

	static alloc(): SFBAudioPlayerNode; // inherited from NSObject

	static new(): SFBAudioPlayerNode; // inherited from NSObject

	readonly currentDecoder: SFBPCMDecoding;

	delegate: SFBAudioPlayerNodeDelegate;

	readonly isPlaying: boolean;

	readonly isReady: boolean;

	readonly playbackPosition: SFBPlaybackPosition;

	readonly playbackTime: SFBPlaybackTime;

	readonly queueIsEmpty: boolean;

	readonly renderingFormat: AVAudioFormat;

	readonly supportsSeeking: boolean;

	constructor(o: { format: AVAudioFormat; });

	constructor(o: { format: AVAudioFormat; ringBufferSize: number; });

	constructor(o: { sampleRate: number; channels: number; });

	cancelActiveDecoders(): void;

	cancelCurrentDecoder(): void;

	clearQueue(): void;

	dequeueDecoder(): SFBPCMDecoding;

	enqueueDecoderError(decoder: SFBPCMDecoding, error?: interop.Reference<NSError>): boolean;

	enqueueURLError(url: NSURL, error?: interop.Reference<NSError>): boolean;

	getPlaybackPositionAndTime(playbackPosition: interop.Pointer | interop.Reference<SFBPlaybackPosition>, playbackTime: interop.Pointer | interop.Reference<SFBPlaybackTime>): boolean;

	initWithFormat(format: AVAudioFormat): this;

	initWithFormatRingBufferSize(format: AVAudioFormat, ringBufferSize: number): this;

	initWithSampleRateChannels(sampleRate: number, channels: number): this;

	pause(): void;

	play(): void;

	removeDecoderFromQueue(decoder: SFBPCMDecoding): boolean;

	resetAndEnqueueDecoderError(decoder: SFBPCMDecoding, error?: interop.Reference<NSError>): boolean;

	resetAndEnqueueURLError(url: NSURL, error?: interop.Reference<NSError>): boolean;

	seekBackward(secondsToSkip: number): boolean;

	seekForward(secondsToSkip: number): boolean;

	seekToFrame(frame: number): boolean;

	seekToPosition(position: number): boolean;

	seekToTime(timeInSeconds: number): boolean;

	stop(): void;

	supportsFormat(format: AVAudioFormat): boolean;

	togglePlayPause(): void;
}

interface SFBAudioPlayerNodeDelegate extends NSObjectProtocol {

	audioPlayerNodeDecoderCanceledFramesRendered?(audioPlayerNode: SFBAudioPlayerNode, decoder: SFBPCMDecoding, framesRendered: number): void;

	audioPlayerNodeDecodingComplete?(audioPlayerNode: SFBAudioPlayerNode, decoder: SFBPCMDecoding): void;

	audioPlayerNodeDecodingStarted?(audioPlayerNode: SFBAudioPlayerNode, decoder: SFBPCMDecoding): void;

	audioPlayerNodeEncounteredError?(audioPlayerNode: SFBAudioPlayerNode, error: NSError): void;

	audioPlayerNodeRenderingDecoderWillChangeToDecoderAtHostTime?(audioPlayerNode: SFBAudioPlayerNode, decoder: SFBPCMDecoding, nextDecoder: SFBPCMDecoding, hostTime: number): void;

	audioPlayerNodeRenderingWillCompleteAtHostTime?(audioPlayerNode: SFBAudioPlayerNode, decoder: SFBPCMDecoding, hostTime: number): void;

	audioPlayerNodeRenderingWillStartAtHostTime?(audioPlayerNode: SFBAudioPlayerNode, decoder: SFBPCMDecoding, hostTime: number): void;
}
declare var SFBAudioPlayerNodeDelegate: {

	prototype: SFBAudioPlayerNodeDelegate;
};

declare const enum SFBAudioPlayerNodeErrorCode {

	InternalError = 0,

	FormatNotSupported = 1
}

declare var SFBAudioPlayerNodeErrorDomain: string;

declare const enum SFBAudioPlayerPlaybackState {

	Playing = 0,

	Paused = 1,

	Stopped = 2
}

declare class SFBAudioProperties extends NSObject implements NSCopying {

	static alloc(): SFBAudioProperties; // inherited from NSObject

	static new(): SFBAudioProperties; // inherited from NSObject

	readonly bitDepth: number;

	readonly bitrate: number;

	readonly channelCount: number;

	readonly dictionaryRepresentation: NSDictionary<string, any>;

	readonly duration: number;

	readonly formatName: string;

	readonly frameLength: number;

	readonly sampleRate: number;

	constructor(o: { dictionaryRepresentation: NSDictionary<string, any>; });

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	initWithDictionaryRepresentation(dictionaryRepresentation: NSDictionary<string, any>): this;

	objectForKey(key: string): any;

	objectForKeyedSubscript(key: string): any;
}

declare var SFBAudioPropertiesKeyBitDepth: string;

declare var SFBAudioPropertiesKeyBitrate: string;

declare var SFBAudioPropertiesKeyChannelCount: string;

declare var SFBAudioPropertiesKeyDuration: string;

declare var SFBAudioPropertiesKeyFormatName: string;

declare var SFBAudioPropertiesKeyFrameLength: string;

declare var SFBAudioPropertiesKeySampleRate: string;

declare class SFBDSDDecoder extends NSObject implements SFBDSDDecoding {

	static alloc(): SFBDSDDecoder; // inherited from NSObject

	static handlesMIMEType(mimeType: string): boolean;

	static handlesPathsWithExtension(extension: string): boolean;

	static new(): SFBDSDDecoder; // inherited from NSObject

	static readonly supportedMIMETypes: NSSet<string>;

	static readonly supportedPathExtensions: NSSet<string>;

	readonly decodingIsLossless: boolean; // inherited from SFBAudioDecoding

	readonly inputSource: SFBInputSource; // inherited from SFBAudioDecoding

	readonly isOpen: boolean; // inherited from SFBAudioDecoding

	readonly packetCount: number; // inherited from SFBDSDDecoding

	readonly packetPosition: number; // inherited from SFBDSDDecoding

	readonly processingFormat: AVAudioFormat; // inherited from SFBAudioDecoding

	readonly properties: NSDictionary<string, any>; // inherited from SFBAudioDecoding

	readonly sourceFormat: AVAudioFormat; // inherited from SFBAudioDecoding

	readonly supportsSeeking: boolean; // inherited from SFBAudioDecoding

	constructor(o: { inputSource: SFBInputSource; });

	constructor(o: { inputSource: SFBInputSource; decoderName: string; });

	constructor(o: { inputSource: SFBInputSource; decoderName: string; });

	constructor(o: { inputSource: SFBInputSource; detectContentType: boolean; });

	constructor(o: { inputSource: SFBInputSource; detectContentType: boolean; mimeTypeHint: string; });

	constructor(o: { inputSource: SFBInputSource; });

	constructor(o: { inputSource: SFBInputSource; mimeTypeHint: string; });

	constructor(o: { URL: NSURL; });

	constructor(o: { URL: NSURL; decoderName: string; });

	constructor(o: { URL: NSURL; decoderName: string; });

	constructor(o: { URL: NSURL; detectContentType: boolean; });

	constructor(o: { URL: NSURL; detectContentType: boolean; mimeTypeHint: string; });

	constructor(o: { URL: NSURL; });

	constructor(o: { URL: NSURL; mimeTypeHint: string; });

	closeReturningError(error?: interop.Reference<NSError>): boolean;

	decodeIntoBufferError(buffer: AVAudioBuffer, error?: interop.Reference<NSError>): boolean;

	decodeIntoBufferPacketCountError(buffer: AVAudioCompressedBuffer, packetCount: number, error?: interop.Reference<NSError>): boolean;

	initWithInputSource(inputSource: SFBInputSource): this;

	initWithInputSourceDecoderName(inputSource: SFBInputSource, decoderName: string): this;

	initWithInputSourceDecoderNameError(inputSource: SFBInputSource, decoderName: string, error?: interop.Reference<NSError>): this;

	initWithInputSourceDetectContentTypeError(inputSource: SFBInputSource, detectContentType: boolean, error?: interop.Reference<NSError>): this;

	initWithInputSourceDetectContentTypeMimeTypeHintError(inputSource: SFBInputSource, detectContentType: boolean, mimeTypeHint: string, error?: interop.Reference<NSError>): this;

	initWithInputSourceError(inputSource: SFBInputSource, error?: interop.Reference<NSError>): this;

	initWithInputSourceMimeTypeHintError(inputSource: SFBInputSource, mimeTypeHint: string, error?: interop.Reference<NSError>): this;

	initWithURL(url: NSURL): this;

	initWithURLDecoderName(url: NSURL, decoderName: string): this;

	initWithURLDecoderNameError(url: NSURL, decoderName: string, error?: interop.Reference<NSError>): this;

	initWithURLDetectContentTypeError(url: NSURL, detectContentType: boolean, error?: interop.Reference<NSError>): this;

	initWithURLDetectContentTypeMimeTypeHintError(url: NSURL, detectContentType: boolean, mimeTypeHint: string, error?: interop.Reference<NSError>): this;

	initWithURLError(url: NSURL, error?: interop.Reference<NSError>): this;

	initWithURLMimeTypeHintError(url: NSURL, mimeTypeHint: string, error?: interop.Reference<NSError>): this;

	openReturningError(error?: interop.Reference<NSError>): boolean;

	seekToPacketError(packet: number, error?: interop.Reference<NSError>): boolean;
}

declare const enum SFBDSDDecoderErrorCode {

	InternalError = 0,

	UnknownDecoder = 1,

	InvalidFormat = 2
}

declare var SFBDSDDecoderErrorDomain: string;

declare var SFBDSDDecoderNameDSDIFF: string;

declare var SFBDSDDecoderNameDSF: string;

interface SFBDSDDecoding extends SFBAudioDecoding {

	packetCount: number;

	packetPosition: number;

	decodeIntoBufferPacketCountError(buffer: AVAudioCompressedBuffer, packetCount: number, error?: interop.Reference<NSError>): boolean;

	seekToPacketError(packet: number, error?: interop.Reference<NSError>): boolean;
}
declare var SFBDSDDecoding: {

	prototype: SFBDSDDecoding;
};

declare class SFBDSDPCMDecoder extends NSObject implements SFBPCMDecoding {

	static alloc(): SFBDSDPCMDecoder; // inherited from NSObject

	static new(): SFBDSDPCMDecoder; // inherited from NSObject

	linearGain: number;

	readonly decodingIsLossless: boolean; // inherited from SFBAudioDecoding

	readonly frameLength: number; // inherited from SFBPCMDecoding

	readonly framePosition: number; // inherited from SFBPCMDecoding

	readonly inputSource: SFBInputSource; // inherited from SFBAudioDecoding

	readonly isOpen: boolean; // inherited from SFBAudioDecoding

	readonly processingFormat: AVAudioFormat; // inherited from SFBAudioDecoding

	readonly properties: NSDictionary<string, any>; // inherited from SFBAudioDecoding

	readonly sourceFormat: AVAudioFormat; // inherited from SFBAudioDecoding

	readonly supportsSeeking: boolean; // inherited from SFBAudioDecoding

	constructor(o: { decoder: SFBDSDDecoding; });

	constructor(o: { inputSource: SFBInputSource; });

	constructor(o: { URL: NSURL; });

	closeReturningError(error?: interop.Reference<NSError>): boolean;

	decodeIntoBufferError(buffer: AVAudioBuffer, error?: interop.Reference<NSError>): boolean;

	decodeIntoBufferFrameLengthError(buffer: AVAudioPCMBuffer, frameLength: number, error?: interop.Reference<NSError>): boolean;

	initWithDecoderError(decoder: SFBDSDDecoding, error?: interop.Reference<NSError>): this;

	initWithInputSourceError(inputSource: SFBInputSource, error?: interop.Reference<NSError>): this;

	initWithURLError(url: NSURL, error?: interop.Reference<NSError>): this;

	openReturningError(error?: interop.Reference<NSError>): boolean;

	seekToFrameError(frame: number, error?: interop.Reference<NSError>): boolean;
}

declare class SFBDoPDecoder extends NSObject implements SFBPCMDecoding {

	static alloc(): SFBDoPDecoder; // inherited from NSObject

	static new(): SFBDoPDecoder; // inherited from NSObject

	readonly decodingIsLossless: boolean; // inherited from SFBAudioDecoding

	readonly frameLength: number; // inherited from SFBPCMDecoding

	readonly framePosition: number; // inherited from SFBPCMDecoding

	readonly inputSource: SFBInputSource; // inherited from SFBAudioDecoding

	readonly isOpen: boolean; // inherited from SFBAudioDecoding

	readonly processingFormat: AVAudioFormat; // inherited from SFBAudioDecoding

	readonly properties: NSDictionary<string, any>; // inherited from SFBAudioDecoding

	readonly sourceFormat: AVAudioFormat; // inherited from SFBAudioDecoding

	readonly supportsSeeking: boolean; // inherited from SFBAudioDecoding

	constructor(o: { decoder: SFBDSDDecoding; });

	constructor(o: { inputSource: SFBInputSource; });

	constructor(o: { URL: NSURL; });

	closeReturningError(error?: interop.Reference<NSError>): boolean;

	decodeIntoBufferError(buffer: AVAudioBuffer, error?: interop.Reference<NSError>): boolean;

	decodeIntoBufferFrameLengthError(buffer: AVAudioPCMBuffer, frameLength: number, error?: interop.Reference<NSError>): boolean;

	initWithDecoderError(decoder: SFBDSDDecoding, error?: interop.Reference<NSError>): this;

	initWithInputSourceError(inputSource: SFBInputSource, error?: interop.Reference<NSError>): this;

	initWithURLError(url: NSURL, error?: interop.Reference<NSError>): this;

	openReturningError(error?: interop.Reference<NSError>): boolean;

	seekToFrameError(frame: number, error?: interop.Reference<NSError>): boolean;
}

declare class SFBInputSource extends NSObject {

	static alloc(): SFBInputSource; // inherited from NSObject

	static inputSourceForURLError(url: NSURL, error?: interop.Reference<NSError>): SFBInputSource;

	static inputSourceForURLFlagsError(url: NSURL, flags: SFBInputSourceFlags, error?: interop.Reference<NSError>): SFBInputSource;

	static inputSourceWithBytesLength(bytes: interop.Pointer | interop.Reference<any>, length: number): SFBInputSource;

	static inputSourceWithBytesNoCopyLengthFreeWhenDone(bytes: interop.Pointer | interop.Reference<any>, length: number, freeWhenDone: boolean): SFBInputSource;

	static inputSourceWithData(data: NSData): SFBInputSource;

	static new(): SFBInputSource; // inherited from NSObject

	readonly atEOF: boolean;

	readonly isOpen: boolean;

	readonly supportsSeeking: boolean;

	readonly url: NSURL;

	closeReturningError(error?: interop.Reference<NSError>): boolean;

	getLengthError(length: interop.Pointer | interop.Reference<number>, error?: interop.Reference<NSError>): boolean;

	getOffsetError(offset: interop.Pointer | interop.Reference<number>, error?: interop.Reference<NSError>): boolean;

	openReturningError(error?: interop.Reference<NSError>): boolean;

	readBytesLengthBytesReadError(buffer: interop.Pointer | interop.Reference<any>, length: number, bytesRead: interop.Pointer | interop.Reference<number>, error?: interop.Reference<NSError>): boolean;

	readDataOfLengthError(length: number, error?: interop.Reference<NSError>): NSData;

	readHeaderOfLengthSkipID3v2TagError(length: number, skipID3v2Tag: boolean, error?: interop.Reference<NSError>): NSData;

	readInt16Error(i16: interop.Pointer | interop.Reference<number>, error?: interop.Reference<NSError>): boolean;

	readInt32Error(i32: interop.Pointer | interop.Reference<number>, error?: interop.Reference<NSError>): boolean;

	readInt64Error(i64: interop.Pointer | interop.Reference<number>, error?: interop.Reference<NSError>): boolean;

	readInt8Error(i8: interop.Pointer | interop.Reference<number>, error?: interop.Reference<NSError>): boolean;

	readUInt16BigEndianError(ui16: interop.Pointer | interop.Reference<number>, error?: interop.Reference<NSError>): boolean;

	readUInt16Error(ui16: interop.Pointer | interop.Reference<number>, error?: interop.Reference<NSError>): boolean;

	readUInt16LittleEndianError(ui16: interop.Pointer | interop.Reference<number>, error?: interop.Reference<NSError>): boolean;

	readUInt32BigEndianError(ui32: interop.Pointer | interop.Reference<number>, error?: interop.Reference<NSError>): boolean;

	readUInt32Error(ui32: interop.Pointer | interop.Reference<number>, error?: interop.Reference<NSError>): boolean;

	readUInt32LittleEndianError(ui32: interop.Pointer | interop.Reference<number>, error?: interop.Reference<NSError>): boolean;

	readUInt64BigEndianError(ui64: interop.Pointer | interop.Reference<number>, error?: interop.Reference<NSError>): boolean;

	readUInt64Error(ui64: interop.Pointer | interop.Reference<number>, error?: interop.Reference<NSError>): boolean;

	readUInt64LittleEndianError(ui64: interop.Pointer | interop.Reference<number>, error?: interop.Reference<NSError>): boolean;

	readUInt8Error(ui8: string | interop.Pointer | interop.Reference<any>, error?: interop.Reference<NSError>): boolean;

	seekToOffsetError(offset: number, error?: interop.Reference<NSError>): boolean;
}

declare const enum SFBInputSourceErrorCode {

	FileNotFound = 0,

	InputOutput = 1,

	NotSeekable = 2
}

declare var SFBInputSourceErrorDomain: string;

declare const enum SFBInputSourceFlags {

	MemoryMapFiles = 1,

	LoadFilesInMemory = 2
}

declare var SFBInvalidPlaybackPosition: SFBPlaybackPosition;

declare var SFBInvalidPlaybackTime: SFBPlaybackTime;

declare class SFBLoopableRegionDecoder extends NSObject implements SFBPCMDecoding {

	static alloc(): SFBLoopableRegionDecoder; // inherited from NSObject

	static new(): SFBLoopableRegionDecoder; // inherited from NSObject

	readonly decodingIsLossless: boolean; // inherited from SFBAudioDecoding

	readonly frameLength: number; // inherited from SFBPCMDecoding

	readonly framePosition: number; // inherited from SFBPCMDecoding

	readonly inputSource: SFBInputSource; // inherited from SFBAudioDecoding

	readonly isOpen: boolean; // inherited from SFBAudioDecoding

	readonly processingFormat: AVAudioFormat; // inherited from SFBAudioDecoding

	readonly properties: NSDictionary<string, any>; // inherited from SFBAudioDecoding

	readonly sourceFormat: AVAudioFormat; // inherited from SFBAudioDecoding

	readonly supportsSeeking: boolean; // inherited from SFBAudioDecoding

	constructor(o: { decoder: SFBPCMDecoding; framePosition: number; frameLength: number; });

	constructor(o: { decoder: SFBPCMDecoding; framePosition: number; frameLength: number; repeatCount: number; });

	constructor(o: { inputSource: SFBInputSource; framePosition: number; frameLength: number; });

	constructor(o: { inputSource: SFBInputSource; framePosition: number; frameLength: number; repeatCount: number; });

	constructor(o: { URL: NSURL; framePosition: number; frameLength: number; });

	constructor(o: { URL: NSURL; framePosition: number; frameLength: number; repeatCount: number; });

	closeReturningError(error?: interop.Reference<NSError>): boolean;

	decodeIntoBufferError(buffer: AVAudioBuffer, error?: interop.Reference<NSError>): boolean;

	decodeIntoBufferFrameLengthError(buffer: AVAudioPCMBuffer, frameLength: number, error?: interop.Reference<NSError>): boolean;

	initWithDecoderFramePositionFrameLengthError(decoder: SFBPCMDecoding, framePosition: number, frameLength: number, error?: interop.Reference<NSError>): this;

	initWithDecoderFramePositionFrameLengthRepeatCountError(decoder: SFBPCMDecoding, framePosition: number, frameLength: number, repeatCount: number, error?: interop.Reference<NSError>): this;

	initWithInputSourceFramePositionFrameLengthError(inputSource: SFBInputSource, framePosition: number, frameLength: number, error?: interop.Reference<NSError>): this;

	initWithInputSourceFramePositionFrameLengthRepeatCountError(inputSource: SFBInputSource, framePosition: number, frameLength: number, repeatCount: number, error?: interop.Reference<NSError>): this;

	initWithURLFramePositionFrameLengthError(url: NSURL, framePosition: number, frameLength: number, error?: interop.Reference<NSError>): this;

	initWithURLFramePositionFrameLengthRepeatCountError(url: NSURL, framePosition: number, frameLength: number, repeatCount: number, error?: interop.Reference<NSError>): this;

	openReturningError(error?: interop.Reference<NSError>): boolean;

	seekToFrameError(frame: number, error?: interop.Reference<NSError>): boolean;
}

declare class SFBOutputSource extends NSObject {

	static alloc(): SFBOutputSource; // inherited from NSObject

	static dataOutputSource(): SFBOutputSource;

	static new(): SFBOutputSource; // inherited from NSObject

	static outputSourceForURLError(url: NSURL, error?: interop.Reference<NSError>): SFBOutputSource;

	static outputSourceWithBufferCapacity(buffer: interop.Pointer | interop.Reference<any>, capacity: number): SFBOutputSource;

	readonly atEOF: boolean;

	readonly data: NSData;

	readonly isOpen: boolean;

	readonly supportsSeeking: boolean;

	readonly url: NSURL;

	closeReturningError(error?: interop.Reference<NSError>): boolean;

	getLengthError(length: interop.Pointer | interop.Reference<number>, error?: interop.Reference<NSError>): boolean;

	getOffsetError(offset: interop.Pointer | interop.Reference<number>, error?: interop.Reference<NSError>): boolean;

	openReturningError(error?: interop.Reference<NSError>): boolean;

	readBytesLengthBytesReadError(buffer: interop.Pointer | interop.Reference<any>, length: number, bytesRead: interop.Pointer | interop.Reference<number>, error?: interop.Reference<NSError>): boolean;

	seekToOffsetError(offset: number, error?: interop.Reference<NSError>): boolean;

	writeBytesLengthBytesWrittenError(buffer: interop.Pointer | interop.Reference<any>, length: number, bytesWritten: interop.Pointer | interop.Reference<number>, error?: interop.Reference<NSError>): boolean;

	writeDataError(data: NSData, error?: interop.Reference<NSError>): boolean;

	writeInt16Error(i16: number, error?: interop.Reference<NSError>): boolean;

	writeInt32Error(i32: number, error?: interop.Reference<NSError>): boolean;

	writeInt64Error(i64: number, error?: interop.Reference<NSError>): boolean;

	writeInt8Error(i8: number, error?: interop.Reference<NSError>): boolean;

	writeUInt16BigEndianError(ui16: number, error?: interop.Reference<NSError>): boolean;

	writeUInt16Error(ui16: number, error?: interop.Reference<NSError>): boolean;

	writeUInt16LittleEndianError(ui16: number, error?: interop.Reference<NSError>): boolean;

	writeUInt32BigEndianError(ui32: number, error?: interop.Reference<NSError>): boolean;

	writeUInt32Error(ui32: number, error?: interop.Reference<NSError>): boolean;

	writeUInt32LittleEndianError(ui32: number, error?: interop.Reference<NSError>): boolean;

	writeUInt64BigEndianError(ui64: number, error?: interop.Reference<NSError>): boolean;

	writeUInt64Error(ui64: number, error?: interop.Reference<NSError>): boolean;

	writeUInt64LittleEndianError(ui64: number, error?: interop.Reference<NSError>): boolean;

	writeUInt8Error(ui8: number, error?: interop.Reference<NSError>): boolean;
}

declare const enum SFBOutputSourceErrorCode {

	FileNotFound = 0,

	InputOutput = 1
}

declare var SFBOutputSourceErrorDomain: string;

interface SFBPCMDecoding extends SFBAudioDecoding {

	frameLength: number;

	framePosition: number;

	decodeIntoBufferFrameLengthError(buffer: AVAudioPCMBuffer, frameLength: number, error?: interop.Reference<NSError>): boolean;

	seekToFrameError(frame: number, error?: interop.Reference<NSError>): boolean;
}
declare var SFBPCMDecoding: {

	prototype: SFBPCMDecoding;
};

interface SFBPCMEncoding extends SFBAudioEncoding {

	estimatedFramesToEncode: number;

	framePosition: number;

	encodeFromBufferFrameLengthError(buffer: AVAudioPCMBuffer, frameLength: number, error?: interop.Reference<NSError>): boolean;
}
declare var SFBPCMEncoding: {

	prototype: SFBPCMEncoding;
};

interface SFBPlaybackPosition {
	framePosition: number;
	frameLength: number;
}
declare var SFBPlaybackPosition: interop.StructType<SFBPlaybackPosition>;

interface SFBPlaybackTime {
	currentTime: number;
	totalTime: number;
}
declare var SFBPlaybackTime: interop.StructType<SFBPlaybackTime>;

declare class SFBReplayGainAnalyzer extends NSObject {

	static alloc(): SFBReplayGainAnalyzer; // inherited from NSObject

	static analyzeAlbumError(urls: NSArray<NSURL> | NSURL[], error?: interop.Reference<NSError>): NSDictionary<any, any>;

	static new(): SFBReplayGainAnalyzer; // inherited from NSObject

	static readonly referenceLoudness: number;

	albumGainAndPeakSampleReturningError(error?: interop.Reference<NSError>): NSDictionary<string, number>;

	analyzeTrackError(url: NSURL, error?: interop.Reference<NSError>): NSDictionary<string, number>;
}

declare const enum SFBReplayGainAnalyzerErrorCode {

	FileFormatNotSupported = 0,

	InsufficientSamples = 1
}

declare var SFBReplayGainAnalyzerErrorDomain: string;

declare var SFBReplayGainAnalyzerGainKey: string;

declare var SFBReplayGainAnalyzerPeakKey: string;

declare const SFBUnknownFrameLength: number;

declare const SFBUnknownFramePosition: number;

declare const SFBUnknownPacketCount: number;

declare const SFBUnknownPacketPosition: number;

declare var SFBUnknownTime: number;

declare const kSFBAudioFormatDSD: number;

declare const kSFBAudioFormatDoP: number;

declare const kSFBAudioFormatModule: number;

declare const kSFBAudioFormatMonkeysAudio: number;

declare const kSFBAudioFormatMusepack: number;

declare const kSFBAudioFormatShorten: number;

declare const kSFBAudioFormatSpeex: number;

declare const kSFBAudioFormatTrueAudio: number;

declare const kSFBAudioFormatVorbis: number;

declare const kSFBAudioFormatWavPack: number;

declare const kSFBBytesPerDSDPacketPerChannel: number;

declare const kSFBPCMFramesPerDSDPacket: number;

declare const kSFBSampleRateDSD128: number;

declare const kSFBSampleRateDSD128Variant: number;

declare const kSFBSampleRateDSD256: number;

declare const kSFBSampleRateDSD256Variant: number;

declare const kSFBSampleRateDSD512: number;

declare const kSFBSampleRateDSD512Variant: number;

declare const kSFBSampleRateDSD64: number;

declare const kSFBSampleRateDSD64Variant: number;
