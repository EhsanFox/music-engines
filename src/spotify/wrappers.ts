import { SPAlbum, SPArtist, SPPlaylist, SPTrack } from "../typings/spotify";
import { getData } from "spotify-url-info";
import { DurationType } from "../typings/base";
import { opus, FFmpeg } from "prism-media";
import { downloadOptions } from "ytdl-core";
import DisYT from "discord-ytdl-core";
import { YouTube } from "../youtube"
import { YouTubeTrack } from "../youtube/wrappers";
import { Base } from "../Base";

class SpotifyTrack extends Base implements SPTrack {

    readonly picture: string;
    readonly id: string;
    readonly url: string;
    readonly title: string;
    readonly duration: DurationType;
    private raw: any;

    constructor(data: any)
    {
        super('spotify');
        this.raw = data;

        this.id = data.id;
        this.title = data.name;
        this.picture = data.album.images[0];
        this.url = data.external_urls.spotify;
        this.duration = this._DurationFormater(data.duration_ms, true);
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

    stream(ytdlParams?: downloadOptions): Promise<opus.Encoder | FFmpeg> {
        return new Promise((resolve, reject) => {

            let searchQuery = `${this.raw.artists[0].name} - ${this.raw.name}`;
            const YouTubeInstance = new YouTube();
            YouTubeInstance.use(searchQuery, {
                limit: 1,
                format: true,
                type: 'video'
            })
            .then(res => {
                const data = res[0];
                if(data instanceof YouTubeTrack)
                {
                    resolve(data.stream(ytdlParams));
                }
            })
            .catch(reject);

        })
    }
}

class SpotifyAlbum extends Base implements SPAlbum {

    readonly picture: string;
    readonly id: string;
    readonly url: string;
    readonly title: string;
    readonly releaseDate: string;
    private raw: any;

    constructor(data: any)
    {
        super('spotify');
        this.raw = data;

        this.url = data.external_urls.spotify;
        this.id = data.id;
        this.picture = data.images[0].url;
        this.title = data.name;
        this.releaseDate = data.release_date;

    }

    artists(): Promise<SpotifyArtist | SpotifyArtist[]> {
        return new Promise(async (resolve, reject) => {
            let output: SpotifyArtist[] = [];
                
            for await (const art of this.raw.artists)
            {
                output.push(new SpotifyArtist(art));
            }

            resolve(output);
        })
    }

    tracks(): Promise<SpotifyTrack | SpotifyTrack[]> {
        return new Promise(async (resolve, reject) => {
            getData(this.raw.external_urls.spotify)
            .then(async (albumData: any) => {
                let output: SpotifyTrack[] = [];

                for await (const item of albumData.tracks.items)
                {
                    output.push(new SpotifyTrack(item));
                }

                resolve(output);
            })
            .catch(reject);
        });
    }
}

class SpotifyArtist extends Base implements SPArtist {

    readonly picture: string;
    readonly id: string | Number;
    readonly url: string;
    readonly name: string;
    readonly socials?: any;
    private raw: any;

    constructor(data: any)
    {
        super('spotify');
        this.raw = data;

        this.id = data.id;
        this.name = data.name;
        this.url = data.external_urls.spotify;
        this.socials = data.external_urls;
        this.picture = data.images[0];
    }

    public tracks(): Promise<SpotifyTrack[]> {
        return new Promise(async (resolve, reject) => {
            
            let output: SpotifyTrack[] = [];
            for await (const track of this.raw.tracks)
            {
                output.push(new SpotifyTrack(track));
            }

            resolve(output);
        });
    }
}

class SpotifyPlaylist extends Base implements SPPlaylist {

    readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly size: Number;
    readonly url: string;
    readonly picture: string;
    readonly publisher?: any;
    private raw: any

    constructor(data: any)
    {
        super('spotify');
        this.raw = data;

        this.id = data.id;
        this.title = data.name;
        this.url = data.external_urls.spotify;
        this.description = data.description;
        this.picture = data.images[0].url;
        this.size = data.tracks.items.length;
        this.publisher = data.owner;

    }

    tracks(): Promise<SpotifyTrack[]> {
        return new Promise(async (resolve, reject) => {
            let output = [];

            for await (const item of this.raw.tracks.items)
            {
                output.push(new SpotifyTrack(item));
            }

            resolve(output);
        })
    }
}

export {
    SpotifyAlbum,
    SpotifyArtist,
    SpotifyPlaylist,
    SpotifyTrack
}