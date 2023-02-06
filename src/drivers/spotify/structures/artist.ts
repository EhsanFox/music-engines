import { Author } from "../../../structures";
import { ISpotifyArtist } from "../../../types";

export class SpotifyArtist extends Author implements ISpotifyArtist<string> {
  constructor(id: string, name: string, url: string, readonly picture: string) {
    super(name, id, url);
  }
}
