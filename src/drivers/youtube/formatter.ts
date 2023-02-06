import { YouTubeChannel, YouTubeThumbnail, YouTubeVideo } from "./structures";

export default class YouTubeFormatter {
  parseDuration(duration: string): number {
    duration ??= "0:00";
    const args = duration.split(":");
    let dur = 0;

    switch (args.length) {
      case 3:
        dur =
          parseInt(args[0]) * 60 * 60 * 1000 +
          parseInt(args[1]) * 60 * 1000 +
          parseInt(args[2]) * 1000;
        break;
      case 2:
        dur = parseInt(args[0]) * 60 * 1000 + parseInt(args[1]) * 1000;
        break;
      default:
        dur = parseInt(args[0]) * 1000;
    }

    return dur;
  }

  parseArray(items: any[]) {
    const result: YouTubeVideo[] = [];
    for (const item of items) {
      if (item["videoRenderer"]) {
        const data = item["videoRenderer"];
        const badge = data.ownerBadges && data.ownerBadges[0];
        result.push(
          new YouTubeVideo(
            data.videoId,
            data.title.runs[0].text,
            data.descriptionSnippet && data.descriptionSnippet.runs[0]
              ? data.descriptionSnippet.runs[0].text
              : "",
            `https://www.youtube.com/watch?v=${data.videoId}`,
            {
              data: data.lengthText
                ? this.parseDuration(data.lengthText.simpleText)
                : 0,
            },
            new YouTubeThumbnail(
              data.thumbnail.thumbnails[
                data.thumbnail.thumbnails.length - 1
              ].url,
              data.videoId,
              data.thumbnail.thumbnails[
                data.thumbnail.thumbnails.length - 1
              ].height,
              data.thumbnail.thumbnails[
                data.thumbnail.thumbnails.length - 1
              ].width
            ),
            data.viewCountText?.simpleText?.replace(/[^0-9]/g, "") ?? 0,
            data.publishedTimeText?.simpleText ?? null,
            new YouTubeChannel(
              data.ownerText.runs[0].navigationEndpoint.browseEndpoint
                .browseId || null,
              data.ownerText.runs[0].text || null,
              `https://www.youtube.com${
                data.ownerText.runs[0].navigationEndpoint.browseEndpoint
                  .canonicalBaseUrl ||
                data.ownerText.runs[0].navigationEndpoint.commandMetadata
                  .webCommandMetadata.url
              }`,
              new YouTubeThumbnail(
                data.channelThumbnail?.thumbnails?.[0]?.url ||
                  data.channelThumbnailSupportedRenderers
                    ?.channelThumbnailWithLinkRenderer?.thumbnail
                    ?.thumbnails?.[0]?.url,
                data.ownerText.runs[0].navigationEndpoint.browseEndpoint
                  .browseId || null,
                data.channelThumbnail?.thumbnails?.[0]?.height ||
                  data.channelThumbnailSupportedRenderers
                    ?.channelThumbnailWithLinkRenderer?.thumbnail
                    ?.thumbnails?.[0]?.height,
                data.channelThumbnail?.thumbnails?.[0]?.width ||
                  data.channelThumbnailSupportedRenderers
                    ?.channelThumbnailWithLinkRenderer?.thumbnail
                    ?.thumbnails?.[0]?.width
              ),
              Boolean(
                badge?.metadataBadgeRenderer?.style
                  ?.toLowerCase()
                  .includes("verified")
              )
            )
          )
        );
      }
    }
    return result;
  }
}
