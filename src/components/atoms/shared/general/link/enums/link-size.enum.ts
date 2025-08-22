import { Enum } from "@/utils/type/enum.utils";

export const LinkSize = {
    SM: "sm",
    MD: "md",
    LG: "lg"
} as const;

export type LinkSizeEnum = Enum<typeof LinkSize>;
