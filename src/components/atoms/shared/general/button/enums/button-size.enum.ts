import { Enum } from "@/utils/type/enum.utils";

export const ButtonSize = {
    SM: "sm",
    MD: "md",
    LG: "lg"
} as const;

export type ButtonSizeEnum = Enum<typeof ButtonSize>;
