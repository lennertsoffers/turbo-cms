import { Enum } from "@/utils/type/enum.utils";

export const PanelType = {
    LEFT: "LEFT",
    CENTER: "CENTER",
    RIGHT: "RIGHT"
} as const;

export type PanelTypeEnum = Enum<typeof PanelType>;
