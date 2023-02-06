import { Thumbnail } from "../../../structures";
import { ISpotifyCover } from "../../../types";

export class SpotifyCover extends Thumbnail implements ISpotifyCover {
  constructor(
    url: string,
    readonly height: number | string,
    readonly width: number | string
  ) {
    super(url);
  }
}
