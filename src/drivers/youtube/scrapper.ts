import { Util } from "youtube-sr";
import { IYouTubeSearchOpts } from "../../types";

export class YouTubeScrapper {
  private readonly _engine = Util;
  private readonly safeSearchCookie = "PREF=f2=8000000";

  async search(query: string, opts: IYouTubeSearchOpts) {
    const requestOpts =
      opts.requestOptions && Object.keys(opts.requestOptions).length
        ? { ...opts.requestOptions }
        : {};
    try {
      const filter = this._engine.filter(opts.type);
      const res = await this._engine.makeRequest("/search", {
        data: {
          params: filter,
          query,
        },
        clientCtx: {
          originalUrl: `https://youtube.com/results?search_query=${encodeURIComponent(
            query.trim()
          ).replace(/%20/g, "+")}${filter}`,
        },
        requestOpts,
      });

      const contents =
        res.contents.twoColumnSearchResultsRenderer.primaryContents
          .sectionListRenderer.contents[0].itemSectionRenderer.contents;

      const results = [];
      for (let i = 0; i < contents.length; i++) {}
    } catch (error) {
      const filter = opts.type === "all" ? "" : `&sp=${Util.filter(opts.type)}`;

      const url = `https://youtube.com/results?search_query=${encodeURIComponent(
        query.trim()
      ).replace(/%20/g, "+")}&hl=en${filter}`;

      const html = await Util.getHTML(url, requestOpts);
      return Util.parseSearchResult(html, opts);
    }
  }
}
