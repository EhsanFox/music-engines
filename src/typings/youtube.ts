import { downloadOptions } from "ytdl-core";
import { Playlist, Track, Artist } from "./base";
import { opus as Opus, FFmpeg } from "prism-media";
import { Video as YouTubeSRVideo, Channel as YouTubeSRChannel, Playlist as YouTubeSRPlaylist } from "youtube-sr";
import { YouTubeArtist, YouTubePlaylist, YouTubeTrack } from "../youtube/wrappers";

export interface YTTrack extends Track {

  /**
  * Fetch Track Audio
  * @param {downloadOptions} ytdlParams - YT-DL Params for Fetching Audio
  */
  stream: (ytdlParams?: downloadOptions) => Opus.Encoder | FFmpeg;
}

export interface fetchYouTube {

  /**
  * Limit number Tracks
  */
  limit: number;

   /**
   * Use wrapper or raw data
   */
  format?: boolean;

}

export interface YTPlaylist extends Playlist {
    
  /**
  * Playlist Tracks
  */
  tracks: (options?: fetchYouTube) => Promise<(YouTubeTrack | YouTubeSRVideo)[]>;
 
  /* OPTIONAL PROPS */
 
  /**
  * Playlist Publisher/Creator
  */
  publisher: Artist;

}

export enum ExtractedType {
  ALL = 'all',
  VIDEO = 'video',
  CHANNEL = 'channel',
  PLAYLIST = 'playlist'
}

export interface YTOptions {

  /**
   * Limit result data to fetch
   */
  limit?: number;

  type: "all" | "video" | "channel" | "playlist";

  /**
   * Use wrapper or raw data
   */
  format?: boolean;

}

export interface YTExtractorResult {

  /**
   * Extracted URL
   */
  url: string;

  /**
   * Extracted ID
   */
  id: string;

  /**
   * Extracted Type of Input
   */
  type: 'video' | 'playlist';

}

export interface YTEngine {

  /**
   * YouTube Validator
   */
  validator: (input: string) => boolean;

  /**
   * YouTube Extractor
   */
  extractor: (url: string) => YTExtractorResult;

  /**
   * Engine Main Function
   */
  use: (input: string, opts?: YTOptions) => Promise<(YouTubeTrack | YouTubeArtist | YouTubePlaylist | YouTubeSRChannel | YouTubeSRVideo | YouTubeSRPlaylist)[] | YouTubeTrack | YouTubeArtist | YouTubePlaylist>;

}

export interface YTDLStreamOptions extends downloadOptions {
  seek?: number;
  encoderArgs?: string[];
  fmt?: string;
  opusEncoded?: boolean;
}

export type test = Array<YouTubeTrack | YouTubeArtist | YouTubePlaylist | YouTubeSRChannel | YouTubeSRVideo | YouTubeSRPlaylist>