export class SoundcloudValidator {
  private readonly PLAYLIST_URL =
    /^https?:\/\/(soundcloud\.com|snd\.sc)\/([A-Za-z0-9_-]+)\/sets\/([A-Za-z0-9_-]+)\/?$/;
  private readonly TRACK_URL =
    /^https?:\/\/(soundcloud\.com|snd\.sc)\/([A-Za-z0-9_-]+)\/([A-Za-z0-9_-]+)\/?$/;
  private readonly ARTIST_URL =
    /^https?:\/\/(soundcloud\.com|snd\.sc)\/([A-Za-z0-9_-]+)\/?$/;

  validate(q: string, type: "TRACK" | "PLAYLIST" | "ARTIST" = "TRACK") {
    switch (type) {
      case "TRACK":
        return this.TRACK_URL.test(q);
        break;

      case "ARTIST":
        return this.ARTIST_URL.test(q);
        break;

      case "PLAYLIST":
        return this.PLAYLIST_URL.test(q);
        break;
      default:
        return false;
    }
  }
}
