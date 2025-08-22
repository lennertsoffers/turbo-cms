import { Enum } from "@/utils/type/enum.utils";

export const SelectElementType = {
    SET: "SET",
    APPEND: "APPEND",
    EXTEND: "EXTEND"
} as const;

export type SelectElementTypeEnum = Enum<typeof SelectElementType>;
