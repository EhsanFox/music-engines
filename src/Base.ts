export class Base {

    readonly platform: string;

    constructor(platform: string)
    {
        this.platform = platform;
    }

    public isYoutube(): boolean {
        return (this.platform.toLowerCase() == 'youtube')
    }

    public isSoundcloud(): boolean {
        return (this.platform.toLowerCase() == 'soundcloud')
    }

    public isSpotify(): boolean {
        return (this.platform.toLowerCase() == 'spotify')
    }

    public isDeezer(): boolean {
        return (this.platform.toLowerCase() == 'deezer')
    }
}