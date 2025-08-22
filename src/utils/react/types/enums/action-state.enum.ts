import { Enum } from "@/utils/type/enum.utils";

export const ActionState = {
    IDLE: "IDLE",
    PENDING: "PENDING",
    SUCCESS: "SUCCESS",
    ERROR: "ERROR"
} as const;
export type ActionStateEnum = Enum<typeof ActionState>;
