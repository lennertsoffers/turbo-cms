import { Enum } from "@/utils/type/enum.utils";

export const Direction = {
    HORIZONTAL: "HORIZONTAL",
    VERTICAL: "VERTICAL"
} as const;

export type DirectionEnum = Enum<typeof Direction>;
