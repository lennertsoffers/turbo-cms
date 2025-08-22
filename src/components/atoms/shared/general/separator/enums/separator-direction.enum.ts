import { Enum } from "@/utils/type/enum.utils";

export const SeparatorDirection = {
    HORIZONTAL: "horizontal",
    VERTICAL: "vertical"
} as const;

export type SeparatorDirectionEnum = Enum<typeof SeparatorDirection>;
