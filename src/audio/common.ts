import { Utils, knownFolders, path as nsFilePath } from '@nativescript/core';

export enum AudioPlayerEvents {
    seek = 'seek',
    paused = 'paused',
    started = 'started'
}
/**
 * Helper function to determine if string is a url.
 * @param value [string]
 */
export function isStringUrl(value: string): boolean {
    // check if artURL is a url or local file
    let isURL = false;
    if (value.indexOf('://') !== -1) {
        if (value.indexOf('res://') === -1) {
            isURL = true;
        }
    }
    if (isURL === true) {
        return true;
    } else {
        return false;
    }
}

/**
 * Will determine if a string is a url or a local path. If the string is a url it will return the url.
 * If it is a local path, then the file-system module will return the file system path.
 * @param path [string]
 */
export function resolveAudioFilePath(path: string) {
    if (path) {
        const isUrl = isStringUrl(path);
        // if it's a url just return the audio file url
        if (isUrl === true) {
            return path;
        } else {
            let audioPath;
            let fileName = Utils.isString(path) ? path.trim() : '';
            if (fileName.indexOf('~/') === 0) {
                fileName = nsFilePath.join(knownFolders.currentApp().path, fileName.replace('~/', ''));
                audioPath = fileName;
            } else {
                audioPath = fileName;
            }
            return audioPath;
        }
    }
}
