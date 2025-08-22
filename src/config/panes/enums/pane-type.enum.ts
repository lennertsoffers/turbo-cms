import { Enum } from "@/utils/type/enum.utils";

export const PaneType = {
    PAGE_MENU: "page-menu",
    PAGE_EDITOR: "page-editor",
    PAGE_CREATOR: "page-creator",
    MEDIA_SELECTOR: "media-selector",
    MEDIA_CREATOR: "media-creator",
    ON_OFF_TIMES: "on-off-times",
    VARIABLES_MENU: "variables-menu"
} as const;

export type PaneTypeEnum = Enum<typeof PaneType>;
