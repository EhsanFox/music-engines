import { IncomingMessage } from "http";
import { Client as SCClient, Song, UserInfo, Playlist as SCCPlaylist } from "soundcloud-scraper";
import { DurationType } from "../../typings/base";
import { SCArtist, SCPlaylist, SCTrack } from "../../typings/soundcloud";
const client = new SCClient();

class SoundCloudTrack implements SCTrack {

    readonly platform: string;
    readonly title: string;
    readonly url: string;
    readonly id: string;
    readonly picture: string;
    readonly duration: DurationType;
    private raw: Song;

    constructor(data: Song)
    {
        this.platform = "soundcloud";
        this.raw = data;

        this.id = data.id;
        this.title = data.title;
        this.picture = data.thumbnail;
        this.url = data.url;
        this.duration = this._DurationFormater(data.duration);
    }

    _DurationFormater(data: number, isMs: boolean = true): DurationType {
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

    artist(): Promise<SoundCloudArtist> {
        return new Promise((resolve, reject) => {
            client.getUser(this.raw.author.username)
            .then(data => {
                resolve(new SoundCloudArtist(data));
            })
            .catch(reject);
        });
    }

    stream(): Promise<IncomingMessage> {
        return new Promise((resolve, reject) => {
            this.raw.downloadProgressive()
            .then(resolve)
            .catch(reject);
        });
    }
}

class SoundCloudArtist implements SCArtist {

    readonly platform: string;
    readonly name: string;
    readonly url: string;
    readonly id: string | Number;
    readonly picture: string;
    private raw: UserInfo;

    constructor(data: UserInfo)
    {
        this.platform = "soundcloud";
        this.raw = data;
        this.id = data.username;
        this.name = data.name;
        this.picture = data.avatarURL;
        this.url = data.profile;
    }

    tracks(): Promise<SoundCloudTrack[]> {
        return new Promise(async (resolve, reject) => {
            let output: SoundCloudTrack[] = [];

            for await (const track of this.raw.tracks)
            {
                client.getSongInfo(track.url)
                .then(trackData => {
                    output.push(new SoundCloudTrack(trackData));
                })
                .catch(reject);
            }

            resolve(output);
        });
    }
}

class SoundCloudPlaylist implements SCPlaylist {

    readonly platform: string;
    readonly title: string;
    readonly id: string | number;
    readonly url: string;
    readonly picture: string;
    readonly size: Number;
    readonly description: string;
    private raw: SCCPlaylist;

    constructor(data: SCCPlaylist)
    {
        this.platform = "soundcloud";
        this.raw = data;

        this.id = data.id;
        this.title = data.title;
        this.url = data.url;
        this.description = data.description;
        this.picture = data.thumbnail;
        this.size = data.trackCount;
    }

    tracks(): Promise<SoundCloudTrack[]> {
        return new Promise(async (resolve, reject) => {
            const output: SoundCloudTrack[] = [];
            for await (const track of this.raw.tracks)
            {
                output.push(new SoundCloudTrack(track));
            }

            resolve(output);
        })
    }

    publisher(): Promise<SoundCloudArtist> {
        return new Promise((resolve, reject) => {
            client.getUser(this.raw.author.username)    
            .then(x => {
                resolve(new SoundCloudArtist(x));
            })
            .catch(reject);
        });
    }
}

export {
    SoundCloudTrack,
    SoundCloudArtist,
    SoundCloudPlaylist
}