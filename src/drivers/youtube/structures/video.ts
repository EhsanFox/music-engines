import { Readable } from "stream";
import ytdl, { downloadOptions } from "ytdl-core";
import { Track } from "../../../structures";
import {
  iYouTubeChannel,
  iYouTubeThumbnail,
  iYouTubeVideo,
} from "../../../types";

export class YouTubeVideo
  extends Track
  implements iYouTubeVideo<iYouTubeThumbnail>
{
  constructor(
    id: string,
    title: string,
    description: string,
    url: string,
    duration: { data: number; isMs?: boolean },
    readonly picture: iYouTubeThumbnail | iYouTubeThumbnail[],
    readonly views: number | string,
    readonly uploadDate: Date | string,
    readonly author: iYouTubeChannel<iYouTubeThumbnail>,
    readonly platform: "youtube" = "youtube"
  ) {
    super(platform, id, title, description, url, duration);
  }

  stream(
    params: downloadOptions = {
      filter: "audioonly",
      quality: "highestaudio",
      dlChunkSize: 0,
      highWaterMark: 1 << 24,
    }
  ): Readable {
    return ytdl(this.url, params);
  }
}
