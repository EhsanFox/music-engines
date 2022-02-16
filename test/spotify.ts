import { Spotify } from "../src";

const myEngine = new Spotify();

myEngine.use('https://open.spotify.com/track/2nZ33CKRbgpJQJJQKHuGXb?si=pRSi1AyyRFG4E7urmYqJ-g')
.then(console.log)
.catch(console.error);