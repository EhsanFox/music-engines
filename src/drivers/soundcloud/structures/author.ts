import { Author } from "../../../structures";
import { ISoundCloudAuthor } from "../../../types";

export class SoundCloudAuthor extends Author implements ISoundCloudAuthor {
  constructor(
    name: string,
    id: string,
    url: string,
    readonly picture: string,
    readonly followers: number,
    readonly following: number
  ) {
    super(name, id, url);
  }
}
