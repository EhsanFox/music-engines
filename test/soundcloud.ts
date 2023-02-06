import fs from "fs";
import { Soundcloud } from "../src";
const myDriver = new Soundcloud();

myDriver
  .search("Ali Yasini - Bade To")
  .then((data) => {
    console.log(data[0]);
  })
  .catch(console.error);

myDriver
  .getByUrl("https://soundcloud.com/mehdi-ataei-50445168/ali-yasini-nade-ghol")
  .then((data) => {
    console.log(data);
    const musicBuffer = data.stream();
    musicBuffer.pipe(fs.createWriteStream(`${data.id}.mp3`));
  })
  .catch(console.error);
