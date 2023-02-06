import { Author } from "../../../structures/author";
import { iYouTubeChannel, iYouTubeThumbnail } from "../../../types";

export class YouTubeChannel
  extends Author
  implements iYouTubeChannel<iYouTubeThumbnail>
{
  constructor(
    id: string,
    name: string,
    url: string,
    readonly icon: iYouTubeThumbnail,
    readonly isVerified: boolean
  ) {
    super(name, id, url);
  }
}
