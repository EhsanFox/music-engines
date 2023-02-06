import { Readable } from "stream";
import { downloadOptions } from "ytdl-core";
import { type SearchOptions } from "youtube-sr";

import { IDriverBase } from "./drivers";
import scrapper from "../drivers/spotify/scrapper";
import { AuthorBase, TrackBase } from "./structures";

export interface ISpotifyArtist<ImageType> extends AuthorBase {
  picture: ImageType | ImageType[];
}

export interface ISpotifyTrack<ThumbnailType> extends TrackBase {
  picture: ThumbnailType | ThumbnailType[];
  author: ISpotifyArtist<ThumbnailType>;
  stream: (ytdlParams?: downloadOptions) => Readable;
}

export interface ISpotifyDriver
  extends IDriverBase<
    { safeSearch: boolean },
    ISpotifyTrack<string>,
    "track",
    SearchOptions["requestOptions"]
  > {
  _scrapper: typeof scrapper;
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
