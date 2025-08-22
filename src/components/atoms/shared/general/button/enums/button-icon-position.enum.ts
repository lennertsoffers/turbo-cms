import { Enum } from "@/utils/type/enum.utils";

export const ButtonIconPosition = {
    BEFORE: "before",
    AFTER: "after"
} as const;

export type ButtonIconPositionEnum = Enum<typeof ButtonIconPosition>;
