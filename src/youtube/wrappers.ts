import { downloadOptions } from "ytdl-core";
import DisYT from "discord-ytdl-core";
import { Artist, DurationType } from "../typings/base";
import { YTPlaylist, YTTrack, YTDLStreamOptions } from "../typings/youtube";
import { opus, FFmpeg } from "prism-media";
import { Base } from "../Base";

class YouTubeArtist extends Base implements Artist {

    readonly id: string;
    readonly name: string;
    readonly picture: string;
    readonly url: string;
    private raw: any;

    constructor(data: any)
    {
        super("youtube");
        this.raw = data;

        this.id = data.id;
        this.name = data.name;
        this.url = data.url;
        this.picture = data.icon.url;
    }
}

class YouTubePlaylist extends Base implements YTPlaylist {

    readonly publisher: Artist;
    readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly url: string;
    readonly picture: string;
    readonly size: number;
    public tracks: () => Promise<YouTubeTrack[]>;
    private raw: any;

    constructor(data: any)
    {
        super("youtube");
        this.raw = data;

        this.id = data.id;
        this.title = data.title;
        this.url = data.url;
        this.picture = data.thumbnail.url;
        this.size = this.raw.videos.length;
        this.publisher = new YouTubeArtist(data.channel);
        this.description = "No description.";

        this.tracks = async (): Promise<YouTubeTrack[]> => {
            
            const output: YouTubeTrack[] = [];
            for await (const item of this.raw.videos)
            {
                output.push(new YouTubeTrack(item));
            }

            return output;

        }
    }
}

class YouTubeTrack extends Base implements YTTrack {

    readonly id: string;
    readonly picture: string;
    readonly url: string;
    readonly title: string;
    readonly duration: DurationType;
    public _DurationFormater: (data: number, isMs: boolean) => DurationType;
    public stream: (ytdlParams?: downloadOptions) => opus.Encoder | FFmpeg;
    private raw: any;

    constructor(data: any)
    {
        super("youtube");
        this.raw = data;

        this.id = data.id;
        this.title = data.title;
        this.picture = data.thumbnail.url;
        this.url = data.url;

        this._DurationFormater = (data: number, isMs = true) =>
        {
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

        this.duration = this._DurationFormater(data.duration, true);

        this.stream = (ytdlParams?: YTDLStreamOptions) => {
            return DisYT(this.url, ytdlParams ?? {
                filter: 'audioonly',
                quality: 'highestaudio',
                highWaterMark: 1 << 24
            } );
        }
    }
}

export {
    YouTubePlaylist,
    YouTubeArtist,
    YouTubeTrack
}