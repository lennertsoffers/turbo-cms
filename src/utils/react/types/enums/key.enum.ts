import { Enum } from "@/utils/type/enum.utils";

export const Key = {
    ALT: "Alt"
} as const;

export type KeyEnum = Enum<typeof Key>;
