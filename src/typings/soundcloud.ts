import { IncomingMessage } from "http";
import { SoundCloudArtist, SoundCloudPlaylist, SoundCloudTrack } from "../soundcloud/wrappers";
import { Artist, Playlist, Track } from "./base";

export interface SCExtractorResult {
    url: string;
    type: 'artist' | 'track' | 'playlist' | 'unknown';
}

export interface SCTrack extends Track {

    /**
     * Fetch Track Artist
     */
    artist: () => Promise<SoundCloudArtist>;

    /**
     * Fetch Track Stream
     */
    stream: () => Promise<IncomingMessage>;

}

export interface SCArtist extends Artist {

    /**
     * Fetch Artist Tracks
     */
    tracks: () => Promise<SoundCloudTrack[]>;

}

export interface SCPlaylist extends Playlist {

    /**
     * Fetch Playlist Tracks
     */
    tracks: () => Promise<SoundCloudTrack[]>;

    /**
     * Fetch Playlist Publisher Data
     */
    publisher: () => Promise<SoundCloudArtist>;

}

export interface SCEngine {

    /**
    * SoundCloud Validator
    */
     validator: (input: string) => boolean;

    /**
    * SoundCloud Extractor
    */
    extractor: (input: string) => SCExtractorResult;

    use: (input: string, type?: 'all' | 'artist' | 'track' | 'playlist') => Promise<(SoundCloudTrack | SoundCloudArtist | SoundCloudPlaylist)[] | SoundCloudTrack | SoundCloudArtist | SoundCloudPlaylist>;

}