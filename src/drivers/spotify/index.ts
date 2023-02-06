import {
  ISpotifyDriver,
  IDrivers,
  ISearchOptionBase,
  ISpotifyCover,
  ISpotifyTrack,
} from "../../types";
import YouTube from "../youtube";
import { SpotifyFormatter } from "./formatter";
import SpotifyScrapper from "./scrapper";
export default class SpotifyDriver implements ISpotifyDriver {
  readonly _scrapper: typeof SpotifyScrapper = SpotifyScrapper;
  readonly _formatter: SpotifyFormatter = new SpotifyFormatter();
  readonly platform: IDrivers = "spotify";

  constructor(
    readonly config: { safeSearch: boolean } = { safeSearch: false }
  ) {}

  async getById(
    id: string | number,
    options: ISearchOptionBase<"track", RequestInit | undefined> = {
      type: "track",
    }
  ): Promise<ISpotifyTrack<ISpotifyCover>> {
    const url = this._formatter.parseUri(`spotify:track:${id}`);
    const youtubeInstance = new YouTube();
    const result = await this._scrapper.getData(url);
    const ytResult = await youtubeInstance.search(
      `${result.artists[0].name} - ${result.name}`,
      {
        ...options,
        type: options.type === "track" ? "video" : "video",
      }
    );
    return this._formatter.parseVideo(result, ytResult[0]);
  }
}
