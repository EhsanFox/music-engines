import { IncomingMessage } from "http";
import type { Song } from "soundcloud-scraper";
import { SoundCloudAuthor, SoundCloudTrack } from "./structures";

export class SoundCloudFormatter {
  parseTrack(data: Song, stream: IncomingMessage) {
    return new SoundCloudTrack(
      data.id,
      data.title,
      data.description,
      data.url,
      data.duration,
      data.thumbnail,
      new SoundCloudAuthor(
        data.author.name,
        data.author.username,
        data.author.url,
        data.author.avatarURL,
        data.author.followers,
        data.author.following
      ),
      stream
    );
  }
}
