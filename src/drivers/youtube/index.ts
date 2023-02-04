import YouTubeScrapper from "./scrapper";
import YouTubeFormatter from "./formatter";
import { IDrivers, ISearchOptionBase, IYouTubeDriver } from "../../types";
import { YouTubeVideo } from "./structures";

export default class YouTube implements IYouTubeDriver {
  readonly _scrapper: YouTubeScrapper = new YouTubeScrapper();
  readonly _formatter: YouTubeFormatter = new YouTubeFormatter();
  readonly platform: IDrivers = "youtube";

  constructor(
    readonly config: { safeSearch: boolean } = { safeSearch: false }
  ) {}

  async search(
    query: string,
    options: ISearchOptionBase<"video", RequestInit | undefined> = {
      type: "video",
    }
  ): Promise<YouTubeVideo[]> {
    const searchResult = await this._scrapper.search(query, options);
    const formattedResult = this._formatter.parseArray(
      Array.isArray(searchResult) ? searchResult : [searchResult]
    );
    return formattedResult;
  }

  async getById(
    id: string | number,
    options: ISearchOptionBase<"video", RequestInit | undefined> = {
      type: "video",
    }
  ): Promise<YouTubeVideo> {
    const url = `https://www.youtube.com/watch?v=${id}`;
    const rawData = await this._scrapper._engine.getHTML(
      `${url}&hl=en`,
      options.requestOptions ? options.requestOptions : {}
    );
    return this._scrapper.getVideo(rawData);
  }
}
