export interface DurationType {
  full: number;
  ms: number;
  sec: number;
  min: number;
  hour: number;
  format: string;
}
export interface TrackBase {
  platform: string;
  id: string;
  title: string;
  picture: string;
  url: string;
  duration: DurationType;
  /**
   * Track DurationFormater(used by Constructor)
   * @param {Number} data - Full ms/sec length of Track
   * @param {boolean} isMs - is Recived length miliseconds ?
   */
  _durationFormater: (data: number, isMs: boolean) => DurationType;
}
