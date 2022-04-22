import { SCArtist, SCEngine, SCExtractorResult, SCPlaylist, SCTrack } from "../typings/soundcloud";
import { SoundcloudExtractor, SoundcloudValidator } from "./utils";
import { SoundCloudTrack, SoundCloudPlaylist, SoundCloudArtist } from "./wrappers"
import { Client as SCClient } from "soundcloud-scraper";

class SoundCloud implements SCEngine {

    public validator: (input: string) => boolean;
    public extractor: (input: string) => SCExtractorResult;
    private client: SCClient = new SCClient();

    constructor()
    {
        this.validator = SoundcloudValidator;
        this.extractor = SoundcloudExtractor;
    }

    use(input: string, type: "all" | "artist" | "track" | "playlist" = 'all'): Promise<SoundCloudTrack | SoundCloudArtist | SoundCloudPlaylist | (SoundCloudTrack | SoundCloudArtist | SoundCloudPlaylist)[]> {
        return new Promise((resolve, reject) => {
            const isValid = this.validator(input),
                extracted = this.extractor(input);

            if(isValid)
            {
                if(extracted.type == 'track')
                {
                    this.client.getSongInfo(input, {
                        fetchStreamURL: true
                    })
                    .then(data => {
                        resolve(new SoundCloudTrack(data))
                    })
                    .catch(reject)
                }
                else if(extracted.type == 'playlist')
                {
                    this.client.getPlaylist(input)
                    .then(data => {
                        resolve(new SoundCloudPlaylist(data));
                    })
                    .catch(reject);
                }
                else if(extracted.type == 'artist')
                {
                    this.client.getUser(input)
                    .then(data => {
                        resolve(new SoundCloudArtist(data));
                    })
                    .catch(reject)
                }
            }
            else
            {
                this.client.search(input, type)
                .then(async data => {

                    const output: any[] = [];
                    for await (const item of data) 
                    {
                        try {
                            if(item.type == 'track')
                            {
                                output.push(new SoundCloudTrack(
                                    await this.client.getSongInfo(item.url, {
                                    fetchStreamURL: true
                                    })
                                ));
                            }
                            else if(item.type == 'playlist')
                            {
                                output.push(new SoundCloudPlaylist( await this.client.getPlaylist(item.url) ));
                            }
                            else if(item.type == 'artist')
                            {
                                output.push(new SoundCloudArtist( await this.client.getUser(item.url) ));
                            }
                        } catch (error) {
                            reject(error);
                        }
                    }
                    resolve(output);

                })
                .catch(reject)
            }

        });
    }
}

export { SoundCloud, SoundcloudValidator, SoundcloudExtractor };
export * as SoundcloudWrappers from "./wrappers";