import { Enum } from "@/utils/type/enum.utils";

export const SizeUnit = {
    PX: "px",
    REM: "rem",
    PERCENT: "%"
} as const;

export type SizeUnitEnum = Enum<typeof SizeUnit>;
