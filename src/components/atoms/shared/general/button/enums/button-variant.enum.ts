import { Enum } from "@/utils/type/enum.utils";

export const ButtonVariant = {
    SOLID: "solid",
    OUTLINE: "outline"
} as const;

export type ButtonVariantEnum = Enum<typeof ButtonVariant>;
