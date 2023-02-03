import { type SearchOptions } from "youtube-sr";
import { ISearchOptionBase } from "./drivers";
import { TrackBase } from "./structures";

export type IYouTubeType = "all" | "video" | "playlist";
export type IYouTubeSearchOpts = ISearchOptionBase<
  IYouTubeType,
  SearchOptions["requestOptions"]
>;

export interface YouTubeVideo extends TrackBase {
  stream: () => Promise<unknown>;
}
