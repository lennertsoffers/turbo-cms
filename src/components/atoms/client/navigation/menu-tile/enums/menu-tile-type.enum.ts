import { Enum } from "@/utils/type/enum.utils";

export const MenuTileType = {
    LINK: "LINK",
    PANE: "PANE"
} as const;

export type MenuTileTypeEnum = Enum<typeof MenuTileType>;
