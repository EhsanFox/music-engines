import { SPEngine, SPExtractorResult } from "../typings/spotify";
import { SpotifyExtractor, SpotifyValidator } from "./utils";
import { YouTube } from "../youtube";
import { getData } from "spotify-url-info";
import { SpotifyAlbum, SpotifyArtist, SpotifyPlaylist, SpotifyTrack } from "./wrappers";
import { YouTubeTrack } from "../youtube/wrappers";

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
            const validated: boolean = this.validator(input);
            let extracted: SPExtractorResult;

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
                    const resolveOutput: YouTubeTrack[] = [];

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

export { Spotify, SpotifyValidator, SpotifyExtractor };
export * as SpotifyWrappers from "./wrappers";