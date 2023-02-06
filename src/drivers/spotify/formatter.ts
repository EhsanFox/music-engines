import { SpotifyGetDataResult } from "../../types";
import { YouTubeVideo } from "../youtube";
import { SpotifyArtist, SpotifyCover, SpotifyTrack } from "./structures";

export class SpotifyFormatter {
  parseUri(uri: string) {
    const data = uri.split(":");
    return `https://open.spotify.com/${data[1]}/${data[2]}`;
  }

  parseVideo(spData: SpotifyGetDataResult, ytData: YouTubeVideo) {
    return new SpotifyTrack(
      spData.id,
      this.parseUri(spData.uri),
      spData.name,
      { data: spData.maxDuration },
      spData.coverArt.sources.map(
        (x) => new SpotifyCover(x.url, x.height, x.width)
      ),
      spData.artists.map(
        (x) => new SpotifyArtist("", x.name, this.parseUri(x.uri))
      ),
      ytData.url
    );
  }
}
