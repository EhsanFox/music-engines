import { Readable } from "stream";
import { downloadOptions } from "ytdl-core";
import { type SearchOptions } from "youtube-sr";

import { IDriverBase } from "./drivers";
import scrapper from "../drivers/spotify/scrapper";
import { AuthorBase, ThumbnailBase, TrackBase } from "./structures";
import { SpotifyFormatter } from "../drivers/spotify/formatter";

export interface ISpotifyCover extends ThumbnailBase {
  width: number | string;
  height: number | string;
}

export interface ISpotifyArtist<ImageType> extends AuthorBase {
  picture?: ImageType | ImageType[];
}

export interface ISpotifyTrack<ThumbnailType> extends TrackBase {
  picture: ThumbnailType | ThumbnailType[];
  author: ISpotifyArtist<ThumbnailType> | ISpotifyArtist<ThumbnailType>[];
  stream: (ytdlParams?: downloadOptions) => Readable;
}

export interface ISpotifyDriver
  extends IDriverBase<
    { safeSearch: boolean },
    ISpotifyTrack<ISpotifyCover>,
    "track",
    SearchOptions["requestOptions"]
  > {
  _scrapper: typeof scrapper;
  _formatter: SpotifyFormatter;
}

export interface SPExtractorResult {
  type: string;
  uri: string;
  toEmbedURL: () => string;
  toOpenURL: () => string;
  toPlayURL: () => string;
  toURI: () => string;
  toURL: () => string;
}

export interface SpotifyGetDataResult {
  type: string;
  name: string;
  uri: string;
  id: string;
  title: string;
  artists: {
    name: string;
    uri: string;
  }[];
  coverArt: {
    extractedColors: {
      colorDark: { hex: string };
      colorLight: { hex: string };
    };
    sources: { url: string; width: number; height: number }[];
  };
  releaseDate: { isoString: string };
  duration: number;
  maxDuration: number;
  isPlayable: boolean;
  isExplicit: boolean;
  audioPreview: {
    url: string;
    format: string;
  };
  hasVideo: boolean;
  relatedEntityUri: string;
}
