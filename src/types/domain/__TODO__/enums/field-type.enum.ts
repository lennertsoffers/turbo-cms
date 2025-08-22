import { Enum } from "@turbo-cms/utils-type/enum";

export const FieldType = {
    TEXT: "TEXT",
    NUMBER: "NUMBER",
    TEXTAREA: "TEXTAREA",
    SELECT: "SELECT",
    RADIO: "RADIO",
    COLOR: "COLOR",
    COMPOSED: "COMPOSED"
} as const;

export type FieldTypeEnum = Enum<typeof FieldType>;
