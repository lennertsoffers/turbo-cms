import { Enum } from "@turbo-cms/utils-type/enum";

export const ComposedFieldType = {
    LAYOUT: "LAYOUT",
    RESIZING: "RESIZING",
    APPEARANCE: "APPEARANCE",
    SPACING: "SPACING",
    BORDER: "BORDER",
    CORNER_RADIUS: "CORNER_RADIUS"
} as const;

export type ComposedFieldTypeEnum = Enum<typeof ComposedFieldType>;
