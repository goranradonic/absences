import * as React from "react";
import {
    buildUrl,
    downloadBlob,
    isIOSSafari,
} from "./ICalUtils";
import {ICalType} from "../Members/Members";

interface Props {
    href: string;
    event: Array<ICalType>;
    filename: string;
    isCrappyIE: boolean;
    isSupported: boolean;
    className: string;
    dataTest: string
}

export default class ICal extends React.Component<Props> {
    isCrappyIE: boolean;
    public static defaultProps: Partial<Props> = {
        filename: "download.ics",
        href: "#add-to-calendar"
    };

    constructor(props: any) {
        super(props);

        this.isCrappyIE = !!(
            typeof window !== "undefined" &&
            window.navigator.msSaveOrOpenBlob &&
            window.Blob
        );
    }

    handleClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
        e.preventDefault();
        e.stopPropagation();

        const {event, filename} = this.props;
        const url: string = buildUrl(event, isIOSSafari());
        const blob: object = new Blob([url], {
            type: "text/calendar;charset=utf-8"
        });

        if (this.isCrappyIE) {
            window.navigator.msSaveOrOpenBlob(blob, filename);
            return;
        }

        if (isIOSSafari()) {
            window.open(url, "_blank");
            return;
        }

        downloadBlob(blob, filename);
    };

    render() {
        const {children, className, href, dataTest} = this.props;

        return (
            <a className={className} data-test={dataTest} href={href} onClick={this.handleClick}>
                {children}
            </a>
        );
    }
}