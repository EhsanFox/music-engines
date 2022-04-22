import { Util as SoundClouldUtils } from "soundcloud-scraper";
import { SCExtractorResult } from "../typings/soundcloud";

const validator = (url: string): boolean => SoundClouldUtils.validateURL(url, 'all');

function extractor(url: string): SCExtractorResult {
    const result: SCExtractorResult = {
        url,
        type: 'unknown',
    }

    if(SoundClouldUtils.validateURL(url, 'artist'))
        result.type = 'artist';
    else if(SoundClouldUtils.validateURL(url, 'playlist'))
        result.type = 'playlist';
    else if(SoundClouldUtils.validateURL(url, 'track'))
        result.type = 'track';
    else 
        result.type = 'unknown';

    return result;
}

export {
    validator as SoundcloudValidator,
    extractor as SoundcloudExtractor
}