import * as YTTypings from "./typings/youtube";
import * as SPTypings from "./typings/spotify";
import * as SCTypings from "./typings/soundcloud";
import * as DZTypings from "./typings/deezer";
import { YouTube, YoutubeWrappers } from "./youtube";
import { Spotify, SpotifyWrappers } from "./spotify";
import { SoundCloud, SoundcloudWrappers } from "./soundcloud";
import { Deezer, DeezerWrappers } from "./deezer";

const typings = {
    youtube: YTTypings,
    spotify: SPTypings,
    soundcloud: SCTypings,
    deezer: DZTypings
};

const wrappers = {
    youtube: YoutubeWrappers,
    spotify: SpotifyWrappers,
    soundcloud: SoundcloudWrappers,
    deezer: DeezerWrappers
};

export {
    typings,
    wrappers,
    YouTube,
    Spotify,
    SoundCloud,
    Deezer
}