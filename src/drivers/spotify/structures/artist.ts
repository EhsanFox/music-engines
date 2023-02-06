import { Author } from "../../../structures";
import { ISpotifyArtist, ISpotifyCover } from "../../../types";

export class SpotifyArtist
  extends Author
  implements ISpotifyArtist<ISpotifyCover>
{
  constructor(
    id: string,
    name: string,
    url: string,
    readonly picture?: ISpotifyCover | ISpotifyCover[]
  ) {
    super(name, id, url);
  }
}
