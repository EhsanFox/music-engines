import fs from "fs";
import { Spotify } from "../src";
const myDriver = new Spotify();

myDriver
  .getById(`0jdso14vaFnpRazMLEZovF`)
  .then((data) => {
    console.log(data);
    const musicBuffer = data.stream();
    musicBuffer.pipe(fs.createWriteStream(`${data.id}.mp3`));
  })
  .catch(console.error);
