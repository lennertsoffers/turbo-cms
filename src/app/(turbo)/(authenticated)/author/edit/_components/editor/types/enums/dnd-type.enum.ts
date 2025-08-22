import { Enum } from "@turbo-cms/utils-type/enum";

export const DndType = {
    SWITCH: "SWITCH",
    NEST: "NEST"
} as const;

export type DndTypeEnum = Enum<typeof DndType>;
