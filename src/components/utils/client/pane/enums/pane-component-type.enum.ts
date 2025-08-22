import { Enum } from "@/utils/type/enum.utils";

export const PaneComponentType = {
    FORM: "FORM",
    ASIDE: "ASIDE"
} as const;

export type PaneComponentTypeEnum = Enum<typeof PaneComponentType>;
