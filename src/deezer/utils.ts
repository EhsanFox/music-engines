import { DZExtractorResult } from "../typings/deezer";

function extractor(input: string): DZExtractorResult {
    const myRegexp = new RegExp("http[s]*\:[\/]{2}[^.]+[.]deezer.com\/us\/([a-zA-Z-_]+)\/([0-9]+)", "gm");
    const match = myRegexp.exec(input);
    if(!match) return { type: 'unknown', id: 'unknwon' };
    const type = match[1] || null;
    const id = match[2] || null;
    
    return { type, id } as DZExtractorResult;

    
}

function validator(url: string): boolean {
    const pattern = /http[s]*\:[\/]{2}[^.]+[.]deezer.com\/us\/([a-zA-Z-_]+)\/([0-9]+)/;
    return pattern.test(url);
}

export {
    extractor as DeezerExtractor,
    validator as DeezerValidator
}