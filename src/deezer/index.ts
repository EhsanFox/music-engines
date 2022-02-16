import { Deezer as MainDeezer } from "@flazepe/deezer.js";
import { DZAlbum, DZArtist, DZEngine, DZExtractorResult, DZPlaylist, DZTrack } from "../../typings/deezer";
import { DeezerExtractor, DeezerValidator } from "./utils";
import { DeezerAlbum, DeezerArtist, DeezerPlaylist, DeezerTrack } from "./wrappers";

class Deezer implements DZEngine {

    private client: MainDeezer = new MainDeezer();
    public validator: (input: string) => boolean;
    public extractor: (input: string) => DZExtractorResult;

    constructor()
    {
        this.validator = DeezerValidator;
        this.extractor = DeezerExtractor;
    }

    use(input: string, type: "track" | "album" | "artist" | "playlist" = "track"): Promise<DeezerTrack | DeezerAlbum | DeezerArtist | DeezerPlaylist | (DeezerTrack | DeezerAlbum | DeezerArtist | DeezerPlaylist)[]> 
    {
        return new Promise((resolve, reject) => {
            let isValid = this.validator(input),
                inputType = (isValid) ? "url" : (new RegExp(/^\d+$/g).test(input)) ? 'id' : 'search';

            if(inputType == "url" || inputType == "id")
            {
                this.client.get(input, type)
                .then(async data => {
                    if(data)
                    {
                        if(data.type == 'track')
                        {
                            let output = [];
                            for await (const x of data.tracks)
                            {
                                output.push(new DeezerTrack(x));
                            }
                            resolve(output);
                        }
                        else if(data.type == 'album')
                        {
                            resolve(new DeezerAlbum(data.info));
                        }
                        else if(data.type == 'playlist')
                        {
                            resolve(new DeezerPlaylist(data.info));
                        }
                        else if(data.type == 'artist')
                        {
                            resolve(new DeezerArtist(data.info));
                        }
                    }
                    else reject(new Error(`Couldn't Fetch data from Deezer.`))
                })
                .catch(reject); 
            }
            else
            {
                this.client.search(input, type)
                .then(async data => {
                    //Artist Wrapper
                    if(type == 'artist')
                    {
                        let tempout = [];
                        for await (const x of data)
                            tempout.push(new DeezerArtist(x));

                        resolve(tempout);
                    }
                    //Album Wrapper
                    else if(type == 'album')
                    {
                        let tempout = [];
                        for await (const x of data)
                            tempout.push(new DeezerAlbum(x));
                            
                        resolve(tempout);
                    }
                    //Playlist Wrapper
                    else if(type == 'playlist')
                    {
                        let tempout = [];
                        for await (const x of data)
                            tempout.push(new DeezerPlaylist(x));
                            
                        resolve(tempout);
                    }
                    //Track Wrapper
                    else if(type == "track")
                    {
                        let tempout = [];
                        for await (const x of data)
                            tempout.push(new DeezerTrack(x));
                            
                        resolve(tempout);
                    }
                })
                .catch(reject)
            }
        });
    }
}

export { Deezer };