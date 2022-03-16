# Music-Engines

<a href="https://github.com/EhsanFox/music-engines/">
    <img src="https://github.com/EhsanFox/music-engine/raw/main/media/music-engines-logo.png" width="260" align="right" alt="music-engines-logo">
</a>

> music-engines is a package to fetch a music/artist/album or even playlist from the platform you choose, there multi platforms that are supported in this package, so there is no need for any others....

## Table of Contents
- [Why music-engines?](#why-music-engines)
- [Installation](#installation)
- [Features](#features)
- [Platforms](#platforms)
- [Documents](#documents)
- [Examples](#examples)
    - [YouTube Downloader](#youtube-downloader)
    - [Discord Bot](#discord-bot)
- [Credits](#credits)

### Why music-engines?
music-engine currently Supports **4** biggest platform that we all know all-in-one package and access to the Audio buffers directly from the platform API, so we are **all-in-one** and we have **download feature**

### Installation
- Using NPM

`npm install music-engines`

- Using yarn

`yarn add music-engines`

### Features
- [x] Custom Data Wrapper
- [x] No Token Required
- [x] Music Buffers (sometimes FFMPEG or Opus)

### Platforms
- [x] YouTube
- [x] SoundCloud
- [x] Spotify
- [x] Deezer
- [ ] Radio Javan (Maybe, maybe not)

### Documents
Documents are live at [/music-engines](https://ehsan.js.org/music-engines/)

### Examples

#### YouTube Downloader
```js
const { YouTube } = require("music-engines");
const myEngine = new YouTube();

myEngine.use('https://www.youtube.com/watch?v=KQlyGYCKGGA', { format: true })
.then(resultArray => {
    const track = resultArray[0];
    track.stream()
    .then(audioBuffer => {
        audioBuffer.pipe(fs.createWritestream("music.mp3"))
    })
    .catch(console.error)
})
.catch(console.error)
```

#### Discord Bot
```js
const { YouTube } = require("music-engines");
const myEngine = new YouTube();

myEngine.use('https://www.youtube.com/watch?v=KQlyGYCKGGA', { format: true })
.then(resultArray => {
    const track = resultArray[0];

    // Disabling chunking is recommended in Discord bots
    track.stream({ filter: 'audioonly', dlChunkSize: 0 })
    .then(async audioBuffer => {
        // Discord.js Stuff....
        const connection = await voiceChannel.join();
        const dipatcher = connection.play(audioBuffer)
        
        // Enjoy the Music
    })
    .catch(console.error);
})
.catch(console.error)
```
- More Examples would be added soon (PR's are welcome)

### Credits
- Thanks to [Kambiz](https://github.com/Scrip7) for all the helps on the package and Future PR's