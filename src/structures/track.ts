import { DurationType, TrackBase } from "../types";

export class Track implements TrackBase {
  readonly duration: DurationType;

  constructor(
    readonly platform: string,
    readonly id: string,
    readonly title: string,
    readonly picture: string,
    readonly url: string,
    durationData: { data: number; isMs?: boolean }
  ) {
    this.duration = this._durationFormater(
      durationData.data,
      durationData.isMs
    );
  }

  _durationFormater(data: number, isMs = true): DurationType {
    if (isMs) {
      const ms = data % 1000;
      data = (data - ms) / 1000;
    }
    const secs = data % 60;
    data = (data - secs) / 60;
    const mins = data % 60;
    const hrs = (data - mins) / 60;

    return {
      full: data,
      ms: isMs ? data : data * 1000,
      sec: secs,
      min: mins,
      hour: hrs,
      format: hrs ? `${hrs}:${mins}:${secs}` : `${mins}:${secs}`,
    };
  }
}
