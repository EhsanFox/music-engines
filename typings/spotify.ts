import { Artist, Playlist, Track } from "./base";
import { downloadOptions } from "ytdl-core";
import { opus as Opus, FFmpeg } from "prism-media";
import { YTTrack } from "./youtube";
import { SpotifyAlbum, SpotifyArtist, SpotifyPlaylist, SpotifyTrack } from "../src/spotify/wrappers";
import { YouTubeTrack } from "../src/youtube/wrappers";

export interface SPTrack extends Track {

    /**
    * Fetch Track Audio
    * @param {downloadOptions} ytdlParams - YT-DL Params for Fetching Audio
    */
    stream: (ytdlParams?: downloadOptions) => Promise<Opus.Encoder | FFmpeg>;
    
}

export interface SPArtist extends Artist {

    /**
     * Album Tracks to Fetch
     */
    tracks: () => Promise<SpotifyTrack[]>;

    /**
     * External URL's Related to Artist
     */
    socials?: any;

}

export interface SPPlaylist extends Playlist {

    /**
     * Album Tracks to Fetch
     */
    tracks: () => Promise<SpotifyTrack[]>;

}

export interface SPAlbum {

    /**
    * Album Platform Name
    * @example YouTube
    */
    platform: string;

    /**
    * Album ID
    */
    id: string;
  
    /**
    * Album Title
    */
    title: string;
  
    /**
    * Album Picture
    */
    picture: string;
  
    /**
    * Album URL
    */
    url: string;

    /**
     * Release Date of Album
     */
    releaseDate: string;

    /**
     * Album Tracks to Fetch
     */
    tracks: () => Promise<SpotifyTrack[] | SpotifyTrack>;

    /**
     * Artists to Fetch
     */
    artists: () => Promise<SpotifyArtist[] | SpotifyArtist>;

}

export interface SPExtractorResult {

    /**
     * URL/ID Type
     */
    type: string;

    /**
     * URI of Extracted ID
     */
    uri: string;

    toEmbedURL: () => string;
    toOpenURL: () => string;
    toPlayURL: () => string;
    toURI: () => string;
    toURL: () => string;

}

export interface SPEngine {

    /**
    * Spotify Validator
    */
    validator: (input: string) => boolean;

    /**
     * Spotify Extractor
     */
    extractor: (input: string) => SPExtractorResult;

    /**
     * Spotify Main Function
     */
    use: (input: string) => Promise<SpotifyTrack | SpotifyAlbum | SpotifyPlaylist | SpotifyArtist | YouTubeTrack | YouTubeTrack[]>

}