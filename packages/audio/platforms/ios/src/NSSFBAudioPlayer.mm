#import "NSSFBAudioPlayer.h"
#import <SFBAudioEngine/SFBAudioDecoder.h>
#import <SFBAudioEngine/SFBDSDDecoder.h>
#import <SFBAudioEngine/SFBDSDPCMDecoder.h>

@interface NSSFBAudioPlayer()
@property (nonatomic, strong, nullable) AVAudioUnitVarispeed *varispeed;
@end

@implementation NSSFBAudioPlayer

- (float)volume {
    __block float vol = 0.0f;
    AVAudioEngine *engine = [self audioEngine];
// [self withEngine:^(AVAudioEngine *engine) {
        if (engine && engine.mainMixerNode) {
            vol = engine.mainMixerNode.outputVolume;
        }
//    }];
    return vol;
}

- (void)setVolume:(float)volume {
    AVAudioEngine *engine = [self audioEngine];
//    [self withEngine:^(AVAudioEngine *engine) {
        if (engine && engine.mainMixerNode) {
            engine.mainMixerNode.outputVolume = volume;
        }
//    }];
}

- (float)rate {
    __block float rate = 1.0f;
//    [self withEngine:^(AVAudioEngine *engine) {
        if (self.varispeed) {
            rate = self.varispeed.rate;
        }
//    }];
    return rate;
}

- (void)setRate:(float)rate {
    // Create and wire varispeed inside the engine context
    AVAudioEngine *engine = [self audioEngine];
//   [self withEngine:^(AVAudioEngine *engine) {
        if (!engine) {
            NSLog(@"TNS_SFBAudioPlayer: engine is nil");
            return;
        }
        if (self.varispeed) {

        } else {
            AVAudioMixerNode *mainMixer = engine.mainMixerNode;
            if (!mainMixer) {
                NSLog(@"TNS_SFBAudioPlayer: engine missing main mixer node");
                return;
            }

            // Get the connection point feeding the main mixer input bus 0
            AVAudioConnectionPoint *mainMixerInputConnectionPoint = [engine inputConnectionPointForNode:mainMixer inputBus:0];
            if (!mainMixerInputConnectionPoint) {
                NSLog(@"TNS_SFBAudioPlayer: AVAudioEngine missing main mixer input connection point");
                return;
            }

            // Create varispeed unit
            self.varispeed = [[AVAudioUnitVarispeed alloc] init];
            if (!self.varispeed) {
                NSLog(@"TNS_SFBAudioPlayer: failed to create AVAudioUnitVarispeed");
                return;
            }

            // Ensure effect is active and set initial rate
            self.varispeed.AUAudioUnit.shouldBypassEffect = NO;
            // Attach and rewire nodes: input -> varispeed -> mainMixer
            [engine attachNode:self.varispeed];

            // Disconnect existing connection into mainMixer on bus 0
            [engine disconnectNodeInput:mainMixer bus:0];

            // Connect varispeed -> mainMixer
            [engine connect:self.varispeed to:mainMixer format:nil];

            // Reconnect the original node that fed the main mixer into the varispeed
            AVAudioNode *mainMixerInputNode = mainMixerInputConnectionPoint.node;
            if (!mainMixerInputNode) {
                NSLog(@"TNS_SFBAudioPlayer: missing input node to main mixer");
                return;
            }
            [engine connect:mainMixerInputNode to:self.varispeed format:[mainMixer inputFormatForBus:0]];
        }
        // Store for future updates
        self.varispeed.rate = rate;
//    }];
}

+(NSSFBAudioPlayer*)playAudio:(NSString*) audioPath {
//    NSURL *url = [NSURL fileURLWithPath:[audioPath stringByReplacingOccurrencesOfString:@"2514.mp3" withString:@"angel.mp3"]];
    NSURL *url = [NSURL fileURLWithPath:audioPath];

    NSString *extension = [[url pathExtension] lowercaseString];
    
    if (![[SFBAudioDecoder supportedPathExtensions] containsObject:extension]) {
        NSString *errorMessage = [NSString stringWithFormat:@"unsupported audio extension %@", extension];
        @throw [NSException exceptionWithName:@"UnsupportedExtensionException"
                                       reason:errorMessage
                                     userInfo:nil];
    }
    
    id <SFBPCMDecoding> decoder = nil;
    NSError *error = nil;
    
    if ([SFBAudioDecoder handlesPathsWithExtension:extension]) {
        decoder = [[SFBAudioDecoder alloc] initWithURL:url error:&error];
    } else if ([SFBDSDDecoder handlesPathsWithExtension:extension]) {
        SFBDSDDecoder *dsdDecoder = [[SFBDSDDecoder alloc] initWithURL:url error:&error];
        if (dsdDecoder) {
            decoder = [[SFBDSDPCMDecoder alloc] initWithDecoder:dsdDecoder error:&error];
        }
    }
    
    if (!decoder || error) {
        // Handle error appropriately
        return nil;
    }
    
    NSSFBAudioPlayer *player = [NSSFBAudioPlayer new];
    
    [player enqueueDecoder:decoder forImmediatePlayback:NO error:&error];
    [player playReturningError:&error];
    
//    [player playDecoder:decoder error:&error];

    return player;
}

@end
