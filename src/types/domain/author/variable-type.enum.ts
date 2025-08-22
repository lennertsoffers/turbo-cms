import { Enum } from "@/utils/type/enum.utils";

export const VariableType = {
    COLOR: "COLOR",
    TEXT: "TEXT",
    NUMBER: "NUMBER"
} as const;

export type VariableTypeEnum = Enum<typeof VariableType>;
