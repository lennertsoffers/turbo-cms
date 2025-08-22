import { Enum } from "@/utils/type/enum.utils";

export const LinkVariant = {
    SOLID: "solid",
    OUTLINE: "outline"
} as const;

export type LinkVariantEnum = Enum<typeof LinkVariant>;
