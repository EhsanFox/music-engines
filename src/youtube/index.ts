import { ExtractedType, YTEngine, YTExtractorResult, YTOptions } from "../typings/youtube";
import { YouTubeExtractor, YouTubeValidator } from "./utils";
import { YouTube as YouTubeSR, Video as YouTubeSRVideo, Channel as YouTubeSRChannel, Playlist as YouTubeSRPlaylist } from "youtube-sr";
import { YouTubeArtist, YouTubePlaylist, YouTubeTrack } from "./wrappers";

class YouTube implements YTEngine {

    validator: (input: string) => boolean;
    extractor: (url: string) => YTExtractorResult;

    constructor()
    {
        this.validator = YouTubeValidator;
        this.extractor = YouTubeExtractor;
    }

    private handleSR(input: string, opts: YTOptions): Promise<(YouTubeTrack | YouTubeArtist | YouTubePlaylist | YouTubeSRChannel | YouTubeSRVideo | YouTubeSRPlaylist)[]> {
        return {
            [ExtractedType.VIDEO]: this.searchVideo,
            [ExtractedType.ALL]: this.searchAll,
            [ExtractedType.PLAYLIST]: this.searchPlaylist,
            [ExtractedType.CHANNEL]: this.searchChannel
        }[opts.type](input, opts)
    }

    private searchVideo(query: string, options: YTOptions): Promise<(YouTubeTrack | YouTubeSRVideo)[]> {
        return new Promise((resolve, reject) => {
            YouTubeSR.search(query, {
                type: ExtractedType.VIDEO,
                limit: options.limit
            })
            .then(async searchResult => {

                if(!('format' in options) || !options.format)
                    resolve(searchResult);

                else if(options.format)
                {
                    let output: YouTubeTrack[] = [];
                    for await (const item of searchResult)
                    {  
                        output.push(new YouTubeTrack(item));
                    }

                    resolve(output);
                }
            })
            .catch(reject);
        });
    }

    private searchAll(query: string, options: YTOptions): Promise<(YouTubeTrack | YouTubeArtist | YouTubePlaylist | YouTubeSRChannel | YouTubeSRVideo | YouTubeSRPlaylist)[]> {
        return new Promise((resolve, reject) => {
            YouTubeSR.search(query, {
                type: ExtractedType.ALL,
                limit: options.limit
            })
            .then(async searchResult => {

                if(!('format' in options) || !options.format)
                    resolve(searchResult);

                    else if(options.format)
                    {
                        let output = [];
                        for await (const item of searchResult)
                        {
                            if(item instanceof YouTubeSRVideo)
                                output.push(new YouTubeTrack(item));
                            else if(item instanceof YouTubeSRPlaylist)
                                output.push(new YouTubePlaylist(item))
                            else if(item instanceof YouTubeSRChannel)
                                output.push(new YouTubeArtist(item));
                        }
    
                        resolve(output);
                    }
            })
            .catch(reject);
        });
    }

    private searchPlaylist(query: string, options: YTOptions): Promise<(YouTubePlaylist | YouTubeSRPlaylist)[]> {
        return new Promise((resolve, reject) => {
            YouTubeSR.search(query, {
                type: ExtractedType.PLAYLIST,
                limit: options.limit
            })
            .then(async searchResult => {

                if(!('format' in options) || !options.format)
                    resolve(searchResult);

                else if(options.format)
                {
                    let output: YouTubePlaylist[] = [];
                    for await (const item of searchResult)
                    {
                        output.push(new YouTubePlaylist(item))
                    }
    
                    resolve(output);
                }
            })
            .catch(reject);
        });
    }

    private searchChannel(query: string, options: YTOptions): Promise<(YouTubeSRChannel | YouTubeArtist)[]> {
        return new Promise((resolve, reject) => {
            YouTubeSR.search(query, {
                type: ExtractedType.CHANNEL,
                limit: options.limit
            })
            .then(async searchResult => {

                if(!('format' in options) || !options.format)
                    resolve(searchResult);

                else if(options.format)
                {
                    let output: YouTubeArtist[] = [];
                    for await (const item of searchResult)
                    {
                        output.push(new YouTubeArtist(item))
                    }
    
                    resolve(output);
                }
            })
            .catch(reject);
        });
    }

    async use(input: string, opts: YTOptions = {
        format: true,
        limit: 10,
        type: 'video'
    }): Promise<(YouTubeTrack | YouTubeArtist | YouTubePlaylist | YouTubeSRChannel | YouTubeSRVideo | YouTubeSRPlaylist)[]> {
        return new Promise((resolve, reject) => {
            if(!input)
                reject(new Error(`input is invalid.`));

            if(this.validator(input))
            {
                const inputData = this.extractor(input);
                
                switch (inputData.type) {
                    case "video":
                        YouTubeSR.getVideo(inputData.url)
                        .then(data => {
                            resolve([new YouTubeTrack(data)]);
                        })
                        .catch(reject)
                        break;
                    
                    case "playlist":
                        YouTubeSR.getPlaylist(inputData.url)
                        .then(data => {
                            resolve([new YouTubePlaylist(data)]);
                        })
                        .catch(reject)
                        break;
                }
            }
            else
            {
                this.handleSR(input, opts)
                .then(resolve)
                .catch(reject);
            }
        })
    }
}

export { YouTube };
export * as YoutubeWrappers from "./wrappers";