import { Readable } from "stream";

export interface DurationType {
    /**
     * Full ms/seconds
     */
    full: Number;

    /**
     * MiliSeconds
     */
    ms: Number;

    /**
     * Seconds
     */
    sec: Number;

    /**
     * Minutes
     */
    min: Number;

    /**
     * Hours
     */
    hour: Number;

    /**
     * Formated Duration/Time
     */
    format: string;
};

export interface Artist {
  
    /**
    * Artist Platform Name
    * @example YouTube
    */
    platform: string;

    /**
     * Artist Name
     */
    name: string;

    /**
     * Artist ID
     */
    id: Number | string;

    /**
     * Artist URL
     */
    url: string;

    /**
     * Artist Picture URL
     */
    picture: string;

    /* OPTIONAL & CHANGEABLE PROPS */

    /**
     * Artist Tracks
     */ 
    tracks?: any;

    /**
     * Artist Social Links
     */
    socials?: any;
}

export interface Track {

    /**
    * Artist Platform Name
    * @example YouTube
    */
    platform: string;

    /**
     * Track ID
     */
    id: string;

    /**
     * Track Title
     */
    title: string;

    /**
     * Track Picture
     */
    picture: string;

    /**
     * Track URL
     */
    url: string;

    /**
     * Track Duration
     */
    duration: DurationType;

    /**
     * Track DurationFormater(used by Constructer)
     * @param {Number} data - Full ms/sec length of Track
     * @param {boolean} isMs - is Recived length miliseconds ?
     */
    _DurationFormater: (data: number, isMs: boolean) => DurationType;

    /* OPTIONAL & CHANGEABLE PROPS */

    /**
     * Track Artist
     */
    artist?: any;

    /**
     * Artist who worked with this Track
     */
    artists?: any;

    /**
     * Track Belonging to any Album
     */
    album?: any;

    /**
     * Fetch Audio Stream
     */
    stream?: () => any;
}

export interface Playlist {

    /**
    * Artist Platform Name
    * @example YouTube
    */
    platform: string;

    /**
      * Playlist ID
      */
    id: string | number;
 
    /**
      * Playlist Title
      */
    title: string;

    /**
      * Playlist Description
      */
    description: string;
 
    /**
      * Playlist Picture
      */
    picture: string;
 
    /**
      * Playlist URL
      */
    url: string;
 
    /**
      * Playlist Size
      */
    size: Number;

    /* OPTIONAL & CHANGEABLE PROPS */

    /**
     * Playlist Publisher/Creator
     */
    publisher?: any;

    /**
     * Playlist Tracks
    */
    tracks?: any;

}