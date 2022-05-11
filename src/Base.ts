import { DeezerTrack } from "./deezer/wrappers";
import { SoundCloudTrack } from "./soundcloud/wrappers";
import { SpotifyTrack } from "./spotify/wrappers";
import { YouTubeTrack } from "./youtube/wrappers";

export class Base {

    readonly platform: string;

    constructor(platform: string)
    {
        this.platform = platform;
    }

    public isYoutube(): this is YouTubeTrack {
        return (this.platform.toLowerCase() == 'youtube')
    }

    public isSoundcloud(): this is SoundCloudTrack {
        return (this.platform.toLowerCase() == 'soundcloud')
    }

    public isSpotify(): this is SpotifyTrack {
        return (this.platform.toLowerCase() == 'spotify')
    }

    public isDeezer(): this is DeezerTrack {
        return (this.platform.toLowerCase() == 'deezer')
    }
}