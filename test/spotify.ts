import { Spotify } from "../src";
const myDriver = new Spotify();

myDriver._scrapper
  .getData(
    "https://open.spotify.com/track/0jdso14vaFnpRazMLEZovF?si=c2adaa7497c742b2"
  )
  .then(console.log)
  .catch(console.error);
