import { Enum } from "@/utils/type/enum.utils";

export const PaneState = {
    OPEN: "OPEN",
    CLOSED: "CLOSED",
    OPENING: "OPENING",
    CLOSING: "CLOSING"
} as const;

export type PaneStateEnum = Enum<typeof PaneState>;
