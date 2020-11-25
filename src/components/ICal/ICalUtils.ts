import {ICalType} from "../Members/Members";

const ics = require('ics');

export function buildUrl(
    event: Array<ICalType>,
    useDataURL: boolean = false
): string {

    const { error, value } = ics.createEvents(event)

    if(error){
        console.log(error);
    }

    if (useDataURL) {
        return encodeURI(`data:text/calendar;charset=utf8,${value}`);
    } else {
        return value;
    }
}

export function downloadBlob(blob: object, filename: string): void {
    const linkEl = document.createElement("a");
    linkEl.href = window.URL.createObjectURL(blob);
    linkEl.setAttribute("download", filename);
    document.body.appendChild(linkEl);
    linkEl.click();
    document.body.removeChild(linkEl);
}


export function isIOSSafari(): boolean {
    const ua = window.navigator.userAgent;
    const iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
    const webkit = !!ua.match(/WebKit/i);

    return iOS && webkit && !ua.match(/CriOS/i);
}