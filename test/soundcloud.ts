import { SoundCloud } from "../src";

const myEngine = new SoundCloud();

myEngine.use('Bilie Eilish', 'track')
.then(console.log)
.catch(console.error);