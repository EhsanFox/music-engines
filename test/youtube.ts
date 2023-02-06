import fs from "fs";
import { YouTube } from "../src";
const myDriver = new YouTube();

myDriver.search("Ali Yasini - Bade To")
.then(data => {
    console.log(data[0])
})
.catch(console.error)

myDriver.getById("I0ZFazFYzNw")
.then(data => {
    console.log(data);
    const musicBuffer = data.stream();
    musicBuffer.pipe(fs.createWriteStream(`${data.id}.mp3`))
})
.catch(console.error)