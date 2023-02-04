import { ThumbnailBase } from "../types";

export class Thumbnail implements ThumbnailBase {
  constructor(readonly url: string) {}
}
