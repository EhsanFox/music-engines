import { YouTube } from "../src";

const myEngine = new YouTube();

myEngine.use('https://www.youtube.com/watch?v=HkVIGyMMwv0', {
    type: 'video',
    format: true
})
.then(console.log)
.catch(console.error);