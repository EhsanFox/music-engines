import { Readable } from "stream";
import ytdl, { downloadOptions } from "ytdl-core";
import { Track } from "../../../structures";
import { IDrivers, ISpotifyArtist, ISpotifyTrack } from "../../../types";

export class SpotifyTrack extends Track implements ISpotifyTrack<string> {
  constructor(
    id: string,
    url: string,
    title: string,
    duration: { data: number; isMs?: boolean },
    readonly picture: string,
    readonly author: ISpotifyArtist<string>,
    private readonly ytUrl: string,
    platform: IDrivers = "spotify"
  ) {
    super(platform, id, title, "", url, duration);
  }

  stream(
    params: downloadOptions = {
      filter: "audioonly",
      quality: "highestaudio",
      dlChunkSize: 0,
      highWaterMark: 1 << 24,
    }
  ): Readable {
    return ytdl(this.ytUrl, params);
  }
}
