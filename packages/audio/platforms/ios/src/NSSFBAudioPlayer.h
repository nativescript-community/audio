#import <Foundation/Foundation.h>
#import <AVFoundation/AVFoundation.h>
// If SFBAudioPlayer is exposed via a specific header, adjust this import as needed.
#import <SFBAudioEngine/SFBAudioPlayer.h>
// #import "SFBAudioPlayer.h"

@interface NSSFBAudioPlayer : SFBAudioPlayer
@property (nonatomic, assign) float volume;
@property (nonatomic, assign) float rate;

+(NSSFBAudioPlayer*)playAudio:(NSString*) audioPath;
@end
