"use client";

import { PaneTypeEnum } from "@/config/panes/enums/pane-type.enum";

import { LinkAction } from "./components/link-action/link-action";
import { PaneAction } from "./components/pane-action/pane-action";
import { MenuTileType } from "./enums/menu-tile-type.enum";

import styles from "./menu-tile.module.scss";

type MenuTileProps = (
    {
        type: typeof MenuTileType.LINK;
        href: string;
    } | {
        type: typeof MenuTileType.PANE;
        pane: PaneTypeEnum;
    }
) & {
    title: string;
    description: string;
};

export const MenuTile = async ({ title, description, ...props }: MenuTileProps) => {
    return props.type === MenuTileType.PANE
        ? (
            <PaneAction
                className={styles["action"]}
                pane={props.pane}
            >
                <p>
                    {title}
                </p>
                <p>
                    {description}
                </p>
            </PaneAction>
        )
        : (
            <LinkAction href={props.href}>
                <p>
                    {title}
                </p>
                <p>
                    {description}
                </p>
            </LinkAction>
        );
};
