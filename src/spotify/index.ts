import { SPAlbum, SPArtist, SPEngine, SPExtractorResult, SPPlaylist, SPTrack } from "../typings/spotify";
import { test, YTTrack } from "../typings/youtube";
import { SpotifyExtractor, SpotifyValidator } from "./utils";
import { YouTube } from "../youtube";
import { getData } from "spotify-url-info";
import { SpotifyAlbum, SpotifyArtist, SpotifyPlaylist, SpotifyTrack } from "./wrappers";
import { YouTube as YouTubeSR, Video as YouTubeSRVideo, Channel as YouTubeSRChannel, Playlist as YouTubeSRPlaylist } from "youtube-sr";
import { YouTubeArtist, YouTubePlaylist, YouTubeTrack } from "../youtube/wrappers";

class Spotify implements SPEngine {

    public validator: (input: string) => boolean;
    public extractor: (input: string) => SPExtractorResult;

    constructor()
    {
        this.validator = SpotifyValidator;
        this.extractor = SpotifyExtractor;
    }

    use(input: string): Promise<SpotifyTrack | SpotifyAlbum | SpotifyPlaylist | SpotifyArtist | YouTubeTrack | YouTubeTrack[]> {
        return new Promise((resolve, reject) => {
            let validated: boolean = this.validator(input),
                extracted: SPExtractorResult;

            if(validated)
            {
                extracted = this.extractor(input);
                switch (extracted.type)
                {
                    case "track":
                        getData(extracted.uri).then((trackData: any) => {
                            resolve(new SpotifyTrack(trackData));
                        })
                        .catch(reject);
                    break;

                    case "artist": 
                    getData(extracted.uri).then((trackData: any) => {
                        resolve(new SpotifyArtist(trackData));
                    })
                    .catch(reject);
                    break;

                    case "album":
                        getData(extracted.uri).then((trackData: any) => {
                            resolve(new SpotifyAlbum(trackData));
                        })
                        .catch(reject);
                    break;

                    case "playlist":
                        getData(extracted.uri).then((trackData: any) => {
                            resolve(new SpotifyPlaylist(trackData));
                        })
                        .catch(reject);
                    break;
                }
            }
            else
            {
                const YouTubeInstance = new YouTube();
                YouTubeInstance.use(input, {
                    format: true,
                    limit: 5,
                    type: 'video'
                })
                .then(async res => {
                    let resolveOutput: YouTubeTrack[] = [];

                    for await (const item of res)
                    {
                        if(item instanceof YouTubeTrack)
                            resolveOutput.push(item);
                    }

                    resolve(resolveOutput);
                })
                .catch(reject);
            }
        });
    }
}

export { Spotify };