import { Client } from "soundcloud-scraper";

import { IDrivers } from "../../types";
import { ISoundCloudDriver } from "../../types/soundcloud";
import { SoundCloudFormatter } from "./formatter";

import { SoundCloudTrack } from "./structures";

export default class SoundCloud implements ISoundCloudDriver {
  readonly _formatter: SoundCloudFormatter = new SoundCloudFormatter();
  private readonly _client: Client;
  readonly platform: IDrivers = "soundcloud";

  constructor(readonly config: string | undefined = undefined) {
    this._client = this.config ? new Client(this.config) : new Client();
  }

  async search(query: string): Promise<SoundCloudTrack[]> {
    const result: SoundCloudTrack[] = [];
    const searchResult = await this._client.search(query, "track");
    for await (const item of searchResult) {
      result.push(await this.getByUrl(item.url));
    }
    return result;
  }

  async getByUrl(url: string): Promise<SoundCloudTrack> {
    const itemResult = await this._client.getSongInfo(url, {
      fetchStreamURL: true,
    });
    const itemStream = await itemResult.downloadProgressive();
    return this._formatter.parseTrack(itemResult, itemStream);
  }
}
export * from "./structures";
