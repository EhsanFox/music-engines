import * as YTTypings from "./typings/youtube";
import * as SPTypings from "./typings/spotify";
import * as SCTypings from "./typings/soundcloud";
import * as DZTypings from "./typings/deezer";
import { YouTube, YoutubeWrappers, YouTubeExtractor, YouTubeValidator } from "./youtube";
import { Spotify, SpotifyWrappers, SpotifyExtractor, SpotifyValidator } from "./spotify";
import { SoundCloud, SoundcloudWrappers, SoundcloudExtractor, SoundcloudValidator } from "./soundcloud";
import { Deezer, DeezerWrappers, DeezerExtractor, DeezerValidator } from "./deezer";

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

const validators = {
    youtube: YouTubeValidator,
    spotify: SpotifyValidator,
    soundcloud: SoundcloudValidator,
    deezer: DeezerValidator
};

const extractors = {
    youtube: YouTubeExtractor,
    spotify: SpotifyExtractor,
    soundcloud: SoundcloudExtractor,
    deezer: DeezerExtractor
}

export {
    typings,
    wrappers,
    validators,
    extractors,
    YouTube,
    Spotify,
    SoundCloud,
    Deezer
}