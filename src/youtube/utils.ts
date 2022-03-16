import { validateID, validateURL, getVideoID } from "ytdl-core";
import { YTExtractorResult } from "../typings/youtube";
import YouTube from "youtube-sr";

function validator(input: string): boolean {
    if(validateID(input) || validateURL(input))
        return true;
    else
        return false;
}

function extractor(url: string): YTExtractorResult {
    let res: YTExtractorResult = {
        url: (validateURL(url)) ? url : `https://www.youtube.com/watch?v=${url}`,
        id: (validateURL(url)) ? getVideoID(url) : url,
        type: 'video'
    };

    if(YouTube.validate(res.url, 'VIDEO') || YouTube.validate(res.url, 'VIDEO_ID'))
        res.type = 'video';
    else if(YouTube.validate(res.url, 'PLAYLIST') || YouTube.validate(res.url, 'PLAYLIST_ID'))
        res.type = 'playlist';

    return res;
}

export {
    validator as YouTubeValidator,
    extractor as YouTubeExtractor
}