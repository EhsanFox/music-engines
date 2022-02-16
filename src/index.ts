import * as YTTypings from "../typings/youtube";
import * as SPTypings from "../typings/spotify";
import * as SCTypings from "../typings/soundcloud";
import * as DZTypings from "../typings/deezer";
import { YouTube } from "./youtube";
import { Spotify } from "./spotify";
import { SoundCloud } from "./soundcloud";
import { Deezer } from "./deezer";

const typings = {
    youtube: YTTypings,
    spotify: SPTypings,
    soundcloud: SCTypings,
    deezer: DZTypings
};

export {
    typings,
    YouTube,
    Spotify,
    SoundCloud,
    Deezer
}