import { AnimationEvent } from "react";

export type PaneCloseEvent = {
    url: {
        pathName: string;
        searchParams: URLSearchParams;
    };
} & AnimationEvent;
