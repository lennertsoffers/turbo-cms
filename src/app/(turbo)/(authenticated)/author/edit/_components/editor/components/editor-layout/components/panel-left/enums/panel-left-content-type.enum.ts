import { Enum } from "@turbo-cms/utils-type/enum";

export const PanelLeftContentType = {
    STRUCTURE: "STRUCTURE",
    COMPONENTS: "COMPONENTS"
} as const;

export type PanelLeftContentTypeEnum = Enum<typeof PanelLeftContentType>;
