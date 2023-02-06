import { Spotify } from "../src";
const myDriver = new Spotify();

myDriver._scrapper
  .getData(
    "https://open.spotify.com/track/0jdso14vaFnpRazMLEZovF"
  )
  .then(console.log)
  .catch(console.error);
