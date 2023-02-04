import { Util } from "youtube-sr";
import { IYouTubeSearchOpts } from "../../types";
import { YouTubeChannel, YouTubeThumbnail, YouTubeVideo } from "./structures";

export default class YouTubeScrapper {
  readonly _engine = Util;
  private readonly safeSearchCookie = "PREF=f2=8000000";

  async getVideo(html: string) {
    let data,
      nextData = {};

    try {
      const parsed = JSON.parse(
        html.split("var ytInitialData = ")[1].split(";</script>")[0]
      );
      data = parsed.contents.twoColumnWatchNextResults.results.results.contents;

      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        nextData =
          parsed.contents.twoColumnWatchNextResults.secondaryResults
            .secondaryResults.results;
      } catch {
        // don't do anything
      }
    } catch {
      throw new Error("Could not parse video metadata!");
    }

    const raw = {
      primary:
        data?.find((section: any) => "videoPrimaryInfoRenderer" in section)
          ?.videoPrimaryInfoRenderer || {},
      secondary:
        data?.find((section: any) => "videoSecondaryInfoRenderer" in section)
          ?.videoSecondaryInfoRenderer || {},
    };

    let info: any;

    try {
      info = JSON.parse(
        html.split("var ytInitialPlayerResponse = ")[1].split(";</script>")[0]
      );
    } catch {
      info = JSON.parse(
        html.split("var ytInitialPlayerResponse = ")[1].split(";var")[0]
      );
    }

    if (!info?.videoDetails) throw new Error("Unable to fetch data.");

    info = {
      ...raw.primary,
      ...raw.secondary,
      info,
    };
    const ytdata = {
      id: info.info.videoDetails.videoId,
      title: info.info.videoDetails.title,
      views: parseInt(info.info.videoDetails.viewCount) || 0,
      tags: info.info.videoDetails.keywords,
      private: info.info.videoDetails.isPrivate,
      unlisted: !!info.info.microformat?.playerMicroformatRenderer?.isUnlisted,
      nsfw:
        info.info.microformat?.playerMicroformatRenderer?.isFamilySafe ===
        false,
      live: info.info.videoDetails.isLiveContent,
      duration: parseInt(info.info.videoDetails.lengthSeconds) * 1000,
      shorts: [
        `{"webCommandMetadata":{"url":"/shorts/${info.info.videoDetails.videoId}"`,
        `{window['ytPageType'] = "shorts";`,
        `"/hashtag/shorts"`,
      ].some((r) => html.includes(r)),
      duration_raw: Util.durationString(
        Util.parseMS(parseInt(info.info.videoDetails.lengthSeconds) * 1000 || 0)
      ),
      channel: {
        name: info.info.videoDetails.author,
        id: info.info.videoDetails.channelId,
        url: `https://www.youtube.com${info.owner.videoOwnerRenderer.title.runs[0].navigationEndpoint.browseEndpoint.canonicalBaseUrl}`,
        icon: info.owner.videoOwnerRenderer.thumbnail.thumbnails[0],
        subscribers:
          info.owner.videoOwnerRenderer.subscriberCountText?.simpleText?.replace(
            " subscribers",
            ""
          ),
      },
      description: info.info.videoDetails.shortDescription,
      thumbnail: {
        ...info.info.videoDetails.thumbnail.thumbnails[
          info.info.videoDetails.thumbnail.thumbnails.length - 1
        ],
        id: info.info.videoDetails.videoId,
      },
      uploadedAt: info.dateText.simpleText,
    };

    const payload = new YouTubeVideo(
      ytdata.id,
      ytdata.title,
      ytdata.description,
      `https://www.youtube.com/watch?v=${ytdata.id}`,
      { data: ytdata.duration },
      new YouTubeThumbnail(
        ytdata.thumbnail.url,
        ytdata.thumbnail.id,
        ytdata.thumbnail.height,
        ytdata.thumbnail.width
      ),
      ytdata.views,
      ytdata.uploadedAt,
      new YouTubeChannel(
        ytdata.channel.id,
        ytdata.channel.name,
        ytdata.channel.url,
        new YouTubeThumbnail(
          ytdata.channel.icon.url,
          ytdata.channel.icon.id ?? ytdata.id,
          ytdata.channel.icon.height,
          ytdata.channel.icon.width
        ),
        false
      )
    );

    return payload;
  }

  async search(query: string, opts: IYouTubeSearchOpts = { type: "video" }) {
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

      return contents;
      /*
      const results = [];
      for (let i = 0; i < contents.length; i++) {}
      */
    } catch (error) {
      const filter = `&sp=${Util.filter(opts.type)}`;

      const url = `https://youtube.com/results?search_query=${encodeURIComponent(
        query.trim()
      ).replace(/%20/g, "+")}&hl=en${filter}`;

      let html = await Util.getHTML(url, requestOpts);
      let details = [];
      let fetched = false;

      // try to parse html
      try {
        const data = html
          .split("ytInitialData = JSON.parse('")[1]
          .split("');</script>")[0];
        html = data.replace(/\\x([0-9A-F]{2})/gi, (...items) => {
          return String.fromCharCode(parseInt(items[1], 16));
        });
      } catch {
        /* do nothing */
      }

      try {
        details = JSON.parse(
          html.split('{"itemSectionRenderer":{"contents":')[
            // eslint-disable-next-line no-unexpected-multiline
            html.split('{"itemSectionRenderer":{"contents":').length - 1
          ].split(',"continuations":[{')[0]
        );
        fetched = true;
      } catch {
        /* do nothing */
      }

      if (!fetched) {
        try {
          details = JSON.parse(
            html.split('{"itemSectionRenderer":')[
              // eslint-disable-next-line no-unexpected-multiline
              html.split('{"itemSectionRenderer":').length - 1
            ].split('},{"continuationItemRenderer":{')[0]
          ).contents;
          fetched = true;
        } catch {
          /* do nothing */
        }
      }

      if (!fetched) return [];

      return details;
      //return Util.parseSearchResult(html, opts);
    }
  }
}
