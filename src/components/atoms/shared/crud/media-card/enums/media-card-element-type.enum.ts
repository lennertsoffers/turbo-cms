import { Enum } from "@/utils/type/enum.utils";

export const MediaCardElementType = {
    LI: "LI",
    SECTION: "SECTION"
} as const;

export type MediaCardElementTypeEnum = Enum<typeof MediaCardElementType>;
