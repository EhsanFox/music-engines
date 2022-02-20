import { Deezer } from "@flazepe/deezer.js";
import { DurationType } from "../../typings/base";
import { DZAlbum, DZArtist, DZPlaylist, DZReleaseDate, DZSocials, DZTrack } from "../../typings/deezer";
import { Base } from "../Base";
const client = new Deezer();

class DeezerTrack extends Base implements DZTrack {

    readonly picture: string;
    readonly url: string;
    readonly id: string;
    readonly title: string;
    readonly duration: DurationType;
    private raw: any;

    constructor(data: any)
    {
        super('deezer');
        this.raw = data;

        this.id = data.SNG_ID;
        this.title = data.SNG_TITLE;
        this.url = `https://www.deezer.com/us/track/${this.id}`;
        this.picture = `https://e-cdns-images.dzcdn.net/images/cover/${data.ALB_PICTURE}/264x264-000000-80-0-0.jpg`;
        this.duration = this._DurationFormater(Number(data.DURATION), false);
    }

    stream(): Promise<Buffer> {
        return client.getAndDecryptTrack(this.raw);
    }

    artists(): Promise<DeezerArtist[]> {
        return new Promise(async (resolve, reject) => {
            let output: DeezerArtist[] = [];
            for await (const artist of this.raw.ARTISTS)
            {
                client.get(artist.ART_ID, 'artist').then(d => {
                    if(d)
                        output.push(new DeezerArtist(d.info));
                })
                .catch(reject);
            }
            resolve(output);
        })
    }

    album(): Promise<DeezerAlbum> {
        return new Promise((resolve, reject) => {
            client.get(this.raw.ALB_ID, 'album').then(data => {
                resolve(new DeezerAlbum(data));
            })
            .catch(reject);
        });
    }

    _DurationFormater(data: number, isMs: boolean): DurationType {
        if(isMs)
        {
            var ms = data % 1000;
            data = (data - ms) / 1000;
        }
        var secs = data % 60;
        data = (data - secs) / 60;
        var mins = data % 60;
        var hrs = (data - mins) / 60;
    
        return {
            full: data,
            ms: (isMs) ? data : (data * 1000),
            sec:  secs,
            min: mins,
            hour: hrs,
            format: (hrs) ? `${hrs}:${mins}:${secs}` : `${mins}:${secs}`
        }
    }
}

class DeezerArtist extends Base implements DZArtist {

    readonly id: string;
    readonly name: string;
    readonly url: string;
    readonly picture: string;
    readonly socials: DZSocials;
    private raw: any;

    constructor(data: any)
    {
        super("deezer");
        this.raw = data;

        this.id = data.ART_ID;
        this.name = data.ART_NAME;
        this.url = `https://deezer.com/us/artist/${this.id}`;
        this.picture = `https://cdns-images.dzcdn.net/images/artist/${data.ART_PICTURE}/500x500.jpg`;
        this.socials = {
            twitter: data.TWITTER ?? null,
            facebook: data.FACEBOOK ?? null,
        };
    }

    tracks(): Promise<DeezerTrack[]> {
        return new Promise((resolve, reject) => {
            client.get(this.id, 'artist').then(async d => {
                if(d)
                {
                    let output: DeezerTrack[] = [];
                    for await (const x of d.tracks)
                    {
                        output.push(new DeezerTrack(x));
                    }
                    resolve(output);
                }
                else reject(new Error(`Result was null.`));
            })
            .catch(reject);
        })
    } 
}

class DeezerAlbum extends Base implements DZAlbum {

    readonly id: string;
    readonly title: string;
    readonly url: string;
    readonly picture: string;
    readonly releaseDate: DZReleaseDate;
    readonly available: boolean;
    private raw: any;

    constructor(data: any)
    {
        super("deezer");
        this.raw = data;

        this.id = data.ABL_ID;
        this.title = data.ALB_TITLE;
        this.url = `https://www.deezer.com/us/album/${this.id}`
        this.releaseDate = {
            digital: data.DIGITAL_RELEASE_DATE,
            physical: data.PHYSICAL_RELEASE_DATE
        }
        this.available = data.AVAILABLE;
        this.title = data.LABEL_NAME;
        this.picture = `https://e-cdn-images.dzcdn.net/images/cover/${data.ALB_PICTURE}/264x264-000000-80-0-0.jpg`;
    }

    artists(): Promise<DeezerArtist[]> {
        return new Promise(async (resolve, reject) => {
            let output: DeezerArtist[] = [];
            for await (const artist of this.raw.ARTISTS)
            {
                client.get(artist.ART_ID, 'artist').then(async d => {
                    if(d)
                        output.push(new DeezerArtist(d.info));
                })
                .catch(reject);
            }
            resolve(output);
        });
    }

    tracks(): Promise<DeezerTrack[]> {
        return new Promise((resolve, reject) => {
            client.get(this.id, 'album').then(async d => {
                if(d)
                {
                    let output: DeezerTrack[] = [];
                    for await (const x of d.tracks)
                    {
                        output.push(new DeezerTrack(x));
                    }
                    resolve(output);
                }
                else reject(new Error(`Result was null.`));
            })
            .catch(reject);
        });
    }
}

class DeezerPlaylist extends Base implements DZPlaylist {

    readonly title: string;
    readonly size: Number;
    readonly id: string;
    readonly picture: string;
    readonly url: string;
    readonly description: string;
    private raw: any;

    constructor(data: any)
    {   
        super("deezer");
        this.raw = data;

        this.id = data.PLAYLIST_ID;
        this.title = data.TITLE;
        this.description = data.DESCRIPTION;
        this.size = data.NB_SONG;
        this.picture = `https://e-cdns-images.dzcdn.net/images/${data.PICTURE_TYPE}/${data.PLAYLIST_PICTURE}/200x200-000000-80-0-0.jpg`;
        this.url = `https://www.deezer.com/us/playlist/${this.id}`;
    }

    publisher(): Promise<DeezerArtist[] | any[]> {
        return new Promise(async (resolve, reject) => {
            if(!this.raw.HAS_ARTIST_LINKED)
                resolve([]);

            let output: DeezerArtist[] = [];
            for await (const artist of this.raw.PLAYLIST_LINKED_ARTIST)
            {
                client.get(artist.ART_ID, 'artist').then(d => {
                    if(d)
                        output.push(new DeezerArtist(d.info));
                })
                .catch(reject);
            }
            resolve(output);
        });
    }

    tracks(): Promise<DeezerTrack[]> {
        return new Promise((resolve, reject) => {
            client.get(this.id, 'playlist').then(async d => {
                if(d)
                {
                    let output: DeezerTrack[] = [];
                    for await (const x of d.tracks)
                    {
                        output.push(new DeezerTrack(x));
                    }
                    resolve(output);
                }
                else reject(new Error(`Result was null.`));
            })
            .catch(reject);
        });
    }   
}

export {
    DeezerAlbum,
    DeezerArtist,
    DeezerTrack,
    DeezerPlaylist
}