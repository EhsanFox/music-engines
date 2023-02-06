import { IncomingMessage } from "http";
import { Track } from "../../../structures";
import { ISoundCloudAuthor, ISoundCloudTrack } from "../../../types";

export class SoundCloudTrack extends Track implements ISoundCloudTrack {
  constructor(
    id: string,
    title: string,
    description: string,
    url: string,
    durationMs: number,
    readonly picture: string,
    readonly author: ISoundCloudAuthor,
    private readonly streamRaw: IncomingMessage
  ) {
    super("soundcloud", id, title, description, url, { data: durationMs });
  }

  stream(): IncomingMessage {
    return this.streamRaw;
  }
}
