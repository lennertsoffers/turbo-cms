import { Enum } from "@/utils/type/enum.utils";

export const Event = {
    PANE_OPEN: "PANE_OPEN",
    PANE_OPENED: "PANE_OPENEND",
    PANE_CLOSE: "PANE_CLOSE",
    PANE_CLOSED: "PANE_CLOSED",
    PANE_CLOSE_ALL: "PANE_CLOSE_ALL",
    PAGE_CREATED: "PAGE_CREATED",
    PAGE_UPDATED: "PAGE_UPDATED",
    MEDIA_CREATED: "MEDIA_CREATED",
    MEDIA_SELECTED: "MEDIA_SELECTED"
} as const;

export type EventEnum = Enum<typeof Event>;
