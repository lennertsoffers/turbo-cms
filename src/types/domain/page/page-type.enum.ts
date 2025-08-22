import { Enum } from "@/utils/type/enum.utils";

export const PageType = {
    PAGE: "PAGE",
    FOLDER: "FOLDER"
} as const;

export type PageTypeEnum = Enum<typeof PageType>;
