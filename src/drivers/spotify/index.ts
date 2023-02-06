import { /*ISpotifyDriver,*/ IDrivers } from "../../types";
import SpotifyScrapper from "./scrapper";
export default class SpotifyDriver /*implements ISpotifyDriver*/ {
  readonly _scrapper: typeof SpotifyScrapper = SpotifyScrapper;
  readonly platform: IDrivers = "spotify";

  constructor(
    readonly config: { safeSearch: boolean } = { safeSearch: false }
  ) {}
}
