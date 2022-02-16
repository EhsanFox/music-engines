import { Deezer } from "../src";
const myEngine = new Deezer();

myEngine.use('Bilie Eilish', 'artist')
.then(console.log)
.catch(console.error);