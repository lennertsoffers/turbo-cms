import { Enum } from "@/utils/type/enum.utils";

export const Key = {
    ALT: "Alt",
    ESCAPE: "Escape",
    ARROW_UP: "ArrowUp",
    ARROW_DOWN: "ArrowDown",
    ARROW_LEFT: "ArrowLeft",
    ARROW_RIGHT: "ArrowRight",
    ENTER: "Enter"
} as const;

export type KeyEnum = Enum<typeof Key>;
