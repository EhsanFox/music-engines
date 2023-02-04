import { Thumbnail } from "../../../structures";
import { iYouTubeThumbnail } from "../../../types";

export class YouTubeThumbnail extends Thumbnail implements iYouTubeThumbnail {
  constructor(
    url: string,
    readonly id: string,
    readonly height: number | string,
    readonly width: number | string
  ) {
    super(url);
  }
}
