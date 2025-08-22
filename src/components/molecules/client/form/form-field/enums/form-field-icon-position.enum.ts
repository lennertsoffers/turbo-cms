import { Enum } from "@/utils/type/enum.utils";

export const FormFieldIconPosition = {
    BEFORE: "before",
    AFTER: "after"
} as const;

export type FormFieldIconPositionEnum = Enum<typeof FormFieldIconPosition>;
