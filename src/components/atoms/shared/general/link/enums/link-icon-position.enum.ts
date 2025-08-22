import { Enum } from "@/utils/type/enum.utils";

export const LinkIconPosition = {
    BEFORE: "before",
    AFTER: "after"
} as const;

export type LinkIconPositionEnum = Enum<typeof LinkIconPosition>;
