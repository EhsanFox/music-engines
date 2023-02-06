//eslint-disable-next-line
// @ts-nocheck

import fetch from "node-fetch";
import { formatEmbedURL, formatOpenURL, parse } from "spotify-uri";
import { Element, parse as hParse } from "himalaya";
import { SpotifyGetDataResult } from "../../types";

const TYPE = {
  ALBUM: "album",
  ARTIST: "artist",
  EPISODE: "episode",
  PLAYLIST: "playlist",
  TRACK: "track",
};

const SUPPORTED_TYPES = Object.values(TYPE);

const createGetData =
  () =>
  async (url: string): SpotifyGetDataResult => {
    const parsedUrl = getParsedUrl(url);
    const embedURL = formatEmbedURL(parsedUrl);

    const response = await fetch(embedURL);
    const text = await response.text();
    const embed = hParse(text) as Element[];

    let scripts = embed.find((el: Element) => el.tagName === "html");

    if (scripts === undefined)
      throw new Error(`Couldn't find scripts to fetch data.`);

    scripts = scripts.children
      .find((el) => el.tagName === "body")
      .children.filter(({ tagName }) => tagName === "script");

    let script = scripts.find((script) =>
      script.attributes.some(({ value }) => value === "resource")
    );

    if (script !== undefined) {
      // found data in the older embed style
      return normalizeData({
        data: JSON.parse(Buffer.from(script.children[0].content, "base64")),
      });
    }

    script = scripts.find((script) =>
      script.attributes.some(({ value }) => value === "initial-state")
    );

    if (script !== undefined) {
      // found data in the new embed style
      const data = JSON.parse(Buffer.from(script.children[0].content, "base64"))
        .data.entity;
      return normalizeData({ data });
    }

    throw new Error(
      `Couldn't find any data in embed page that we know how to parse.`
    );
  };

function getParsedUrl(url) {
  try {
    const parsedURL = parse(url);
    if (!parsedURL.type) throw new TypeError();
    return formatEmbedURL(parsedURL);
  } catch (e) {
    throw new TypeError(`Couldn't parse '${url}' as valid URL`);
  }
}

const getImages = (data) => data.coverArt?.sources || data.images;

const getDate = (data) => data.releaseDate?.isoString || data.release_date;

const getLink = (data) => formatOpenURL(data.uri);

function getArtistTrack(track) {
  return track.show
    ? track.show.publisher
    : []
        .concat(track.artists)
        .filter(Boolean)
        .map((a) => a.name)
        .reduce(
          (acc, name, index, array) =>
            index === 0
              ? name
              : acc + (array.length - 1 === index ? " & " : ", ") + name,
          ""
        );
}

function getPreview(data) {
  const track = toTrack(data.trackList ? data.trackList[0] : data);
  const date = getDate(data);

  return {
    date: date ? new Date(date).toISOString() : date,
    title: data.name,
    type: data.type,
    track: track.name,
    description: data.description || data.subtitle || track.description,
    artist: track.artist,
    image: getImages(data).reduce((a, b) => (a.width > b.width ? a : b)).url,
    audio: track.previewUrl,
    link: getLink(data),
    embed: `https://embed.spotify.com/?uri=${data.uri}`,
  };
}

const toTrack = (track) => ({
  artist: getArtistTrack(track) || track.subtitle,
  duration: track.duration,
  name: track.title,
  previewUrl: track.isPlayable ? track.audioPreview.url : undefined,
  uri: track.uri,
});

const getTracks = (data) =>
  data.trackList ? data.trackList.map(toTrack) : [toTrack(data)];

function normalizeData({ data }) {
  if (!data || !data.type || !data.name) {
    throw new Error("Data doesn't seem to be of the right shape to parse");
  }

  if (!SUPPORTED_TYPES.includes(data.type)) {
    throw new Error(
      `Not an ${SUPPORTED_TYPES.join(", ")}. Only these types can be parsed`
    );
  }

  data.type = data.uri.split(":")[1];

  return data;
}

function spotifyUrlInfo() {
  const getData = createGetData();
  return {
    getLink,
    getData,
    getPreview: (url: string) => getData(url).then(getPreview),
    getTracks: (url: string) => getData(url).then(getTracks),
    getDetails: (url: string) =>
      getData(url).then((data) => ({
        preview: getPreview(data),
        tracks: getTracks(data),
      })),
  };
}

export default spotifyUrlInfo();
export { spotifyUrlInfo };
