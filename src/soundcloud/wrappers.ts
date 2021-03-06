import { IncomingMessage } from "http";
import { Client as SCClient, Song, UserInfo, Playlist as SCCPlaylist } from "soundcloud-scraper";
import { DurationType } from "../typings/base";
import { SCArtist, SCPlaylist, SCTrack } from "../typings/soundcloud";
import { Base } from "../Base";
const client = new SCClient();

class SoundCloudTrack extends Base implements SCTrack {

    readonly title: string;
    readonly url: string;
    readonly id: string;
    readonly picture: string;
    readonly duration: DurationType;
    private raw: Song;

    constructor(data: Song)
    {
        super("soundcloud");
        this.raw = data;

        this.id = data.id;
        this.title = data.title;
        this.picture = data.thumbnail;
        this.url = data.url;
        this.duration = this._DurationFormater(data.duration);
    }

    _DurationFormater(data: number, isMs = true): DurationType {
        if(isMs)
        {
            const ms = data % 1000;
            data = (data - ms) / 1000;
        }
        const secs = data % 60;
        data = (data - secs) / 60;
        const mins = data % 60;
        const hrs = (data - mins) / 60;
    
        return {
            full: data,
            ms: (isMs) ? data : (data * 1000),
            sec:  secs,
            min: mins,
            hour: hrs,
            format: (hrs) ? `${hrs}:${mins}:${secs}` : `${mins}:${secs}`
        }
    }

    public async artist(): Promise<SoundCloudArtist> {
        const data = await client.getUser(this.raw.author.username)
        return new SoundCloudArtist(data);
    }

    async stream(): Promise<IncomingMessage> {
        return await this.raw.downloadProgressive()
    }
}

class SoundCloudArtist extends Base implements SCArtist {

    readonly name: string;
    readonly url: string;
    readonly id: string | number;
    readonly picture: string;
    private raw: UserInfo;

    constructor(data: UserInfo)
    {
        super("soundcloud");
        this.raw = data;
        this.id = data.username;
        this.name = data.name;
        this.picture = data.avatarURL;
        this.url = data.profile;
    }

    public async tracks(): Promise<SoundCloudTrack[]> {
        const output: SoundCloudTrack[] = [];
        for await (const track of this.raw.tracks)
        {
            const trackData = await client.getSongInfo(track.url)
            output.push(new SoundCloudTrack(trackData));
        }
        return output;
    }
}

class SoundCloudPlaylist extends Base implements SCPlaylist {

    readonly title: string;
    readonly id: string | number;
    readonly url: string;
    readonly picture: string;
    readonly size: number;
    readonly description: string;
    private raw: SCCPlaylist;

    constructor(data: SCCPlaylist)
    {
        super("soundcloud");
        this.raw = data;

        this.id = data.id;
        this.title = data.title;
        this.url = data.url;
        this.description = data.description;
        this.picture = data.thumbnail;
        this.size = data.trackCount;
    }

    public async tracks(): Promise<SoundCloudTrack[]> {
        const output: SoundCloudTrack[] = [];
        for await (const track of this.raw.tracks)
        {
            output.push(new SoundCloudTrack(track));
        }

        return output;
    }

    public async publisher(): Promise<SoundCloudArtist> { 
        const x = await client.getUser(this.raw.author.username)        
        return new SoundCloudArtist(x);
    }
}

export {
    SoundCloudTrack,
    SoundCloudArtist,
    SoundCloudPlaylist
}