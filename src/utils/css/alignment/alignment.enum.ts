import { Enum } from "@/utils/type/enum.utils";

export const Alignment = {
    TOP_LEFT: "TOP_LEFT",
    TOP_CENTER: "TOP_CENTER",
    TOP_RIGHT: "TOP_RIGHT",
    CENTER_LEFT: "CENTER_LEFT",
    CENTER_CENTER: "CENTER_CENTER",
    CENTER_RIGHT: "CENTER_RIGHT",
    BOTTOM_LEFT: "BOTTOM_LEFT",
    BOTTOM_CENTER: "BOTTOM_CENTER",
    BOTTOM_RIGHT: "BOTTOM_RIGHT"
} as const;

export type AlignmentEnum = Enum<typeof Alignment>;
