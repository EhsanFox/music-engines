import parseSpotifyUri from "spotify-uri";
import pkg, { ParsedSpotifyUri } from "spotify-uri";
import { SPExtractorResult } from "../typings/spotify";
const { formatURI, parse } = pkg;

/**
 * @param {String} url Spotify URL/ID
 * @returns {ParsedSpotifyUri} Parsed Object
 */
function extractor(url: string): SPExtractorResult { return parse(url) as SPExtractorResult }

/**
 * @param {String} input URL to check if it's Valid
 */
function validator(input: string): boolean {
    try {
        return Boolean(formatURI(input));
    } catch (error) {
        return false;        
    }
}

export {
    extractor as SpotifyExtractor,
    validator as SpotifyValidator
}