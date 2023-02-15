export class YouTubeValidator {
  private readonly PLAYLIST_REGEX =
    /^https?:\/\/(www.)?youtube.com\/playlist\?list=((PL|FL|UU|LL|RD|OL)[a-zA-Z0-9-_]{16,41})$/;
  private readonly PLAYLIST_ID = /(PL|FL|UU|LL|RD|OL)[a-zA-Z0-9-_]{16,41}/;
  private readonly ALBUM_REGEX = /(RDC|O)LAK5uy_[a-zA-Z0-9-_]{33}/;
  private readonly VIDEO_URL =
    /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w-]+\?v=|embed\/|v\/)?)([\w-]+)(\S+)?$/;
  private readonly VIDEO_ID = /^[a-zA-Z0-9-_]{11}$/;

  validate(
    q: string,
    type: "VIDEO" | "VIDEO_ID" | "ALBUM" | "PLAYLIST" | "PLAYLIST_ID" = "VIDEO"
  ) {
    switch (type) {
      case "PLAYLIST":
        return this.PLAYLIST_REGEX.test(q);
      case "PLAYLIST_ID":
        return this.PLAYLIST_ID.test(q) || this.ALBUM_REGEX.test(q);
      case "VIDEO":
        return this.VIDEO_URL.test(q);
      case "VIDEO_ID":
        return this.VIDEO_ID.test(q);
      default:
        return false;
    }
  }
}
