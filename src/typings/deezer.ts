import { DeezerAlbum, DeezerArtist, DeezerPlaylist, DeezerTrack } from "../deezer/wrappers";
import { Artist, Playlist, Track } from "./base";

export interface DZExtractorResult {
    type: string;
    id: string;
}

export interface DZTrack extends Track {

    /**
     * Deezer Artists
     */
    artists: () => Promise<DeezerArtist[]>;

    /**
     * Fetch Track Album
     */
    album: () => Promise<DeezerAlbum>;

    /**
     * Fetch Audio Buffer of Track
     */
    stream: () => Promise<Buffer>;
}

export interface DZSocials { 
    twitter?: string | null;
    facebook: string | null;
}

export interface DZArtist extends Artist {

    /**
     * Deezer Social ID/URL's
     */
    socials: DZSocials;

    /**
     * Fetch Artist Tracks
     */
    tracks: () => Promise<DeezerTrack[]>;
}

export interface DZReleaseDate {
    digital: any;
    physical: any;
}

export interface DZAlbum {

    /**
    * Artist Platform Name
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
    releaseDate: DZReleaseDate;

    /**
     * Album available to everyone
     */
    available: boolean;

    /**
     * Artist who worked on this Album
     */
    artists: () => Promise<DeezerArtist[]>;

    /**
     * Fetch Tracks of the Album
     */
    tracks: () => Promise<DeezerTrack[]>;

}

export interface DZPlaylist extends Playlist {

    publisher: () => Promise<DeezerArtist[] | null>;

    tracks: () => Promise<DeezerTrack[]>;

}

export interface DZEngine {

    /**
    * Deezer Validator
    */
    validator: (input: string) => boolean;

    /**
     * Deezer Extractor
     */
    extractor: (input: string) => DZExtractorResult;

    /**
     * Main Deezer Function
     */
    use: (input: string, type?: "track" | "album" | "artist" | "playlist") => Promise<(DeezerTrack | DeezerAlbum | DeezerArtist | DeezerPlaylist)[] | DeezerTrack | DeezerAlbum | DeezerArtist | DeezerPlaylist>

}