import { Readable } from "stream";
import { type SearchOptions } from "youtube-sr";
import { downloadOptions } from "ytdl-core";
import YouTubeFormatter from "../drivers/youtube/formatter";
import YouTubeScrapper from "../drivers/youtube/scrapper";
import { IDriverBase, ISearchOptionBase } from "./drivers";
import { AuthorBase, ThumbnailBase, TrackBase } from "./structures";

export type IYouTubeType = "video";
export type IYouTubeSearchOpts = ISearchOptionBase<
  IYouTubeType,
  SearchOptions["requestOptions"]
>;

export interface iYouTubeThumbnail extends ThumbnailBase {
  id: string;
  height: string | number;
  width: string | number;
}

export interface iYouTubeChannel<ImageType> extends AuthorBase {
  icon: ImageType;
  isVerified: boolean;
}

export interface iYouTubeVideo<ThumbnailType> extends TrackBase {
  picture: ThumbnailType | ThumbnailType[];
  views: number | string;
  uploadDate: Date | string;
  author: iYouTubeChannel<ThumbnailType>;
  stream: (ytdlParams?: downloadOptions) => Readable;
}

export interface IYouTubeDriver
  extends IDriverBase<
    { safeSearch: boolean },
    iYouTubeVideo<iYouTubeThumbnail>,
    IYouTubeType,
    SearchOptions["requestOptions"]
  > {
  _scrapper: YouTubeScrapper;
  _formatter: YouTubeFormatter;
}
