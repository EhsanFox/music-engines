import { IDriverBase } from "./drivers";
import { TrackBase, AuthorBase } from "./structures";
import type { SearchType, SongInfoOptions } from "soundcloud-scraper";
import { IncomingMessage } from "http";
import { SoundCloudFormatter } from "../drivers/soundcloud/formatter";

export interface ISoundCloudConfig {
  apiKey: string;
}

export interface ISoundCloudAuthor extends AuthorBase {
  picture: string;
  followers: number;
  following: number;
}

export interface ISoundCloudTrack extends TrackBase {
  author: ISoundCloudAuthor;
  picture: string;
  stream: () => IncomingMessage;
}

export interface ISoundCloudDriver
  extends IDriverBase<
    string | undefined,
    ISoundCloudTrack,
    SearchType,
    SongInfoOptions
  > {
  _formatter: SoundCloudFormatter;
  search: (query: string) => Promise<ISoundCloudTrack[]>;
  getByUrl: (url: string) => Promise<ISoundCloudTrack>;
}
