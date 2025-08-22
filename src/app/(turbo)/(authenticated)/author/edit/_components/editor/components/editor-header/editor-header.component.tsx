"use client";

import {
    ArrowTurnBackwardIcon,
    ArrowTurnForwardIcon,
    SidebarLeftIcon,
    SidebarRightIcon,
    StartUp02Icon
} from "hugeicons-react";

import { IconButton } from "@turbo-cms/components-general/shared/button/icon-button";
import { Page } from "@turbo-cms/config/payload/payload.types";

import styles from "./editor-header.module.scss";

type EditorHeaderComponentProps = {
    page: Page;
    onToggleLeftPanel: () => void;
    onToggleRightPanel: () => void;
    onUndo: () => void;
    onRedo: () => void;
};

export const EditorHeaderComponent = ({
    page,
    onToggleLeftPanel,
    onToggleRightPanel,
    onUndo,
    onRedo
}: EditorHeaderComponentProps) => {
    const handleOnToggleLeftPanelClick = onToggleLeftPanel;
    const handleOnToggleRightPanelClick = onToggleRightPanel;
    const handleOnUndo = onUndo;
    const handleOnRedo = onRedo;

    return (
        <nav className={styles["editor-header"]}>
            <section className={styles["editor-header__controls"]}>
                <div className={styles["editor-header__controls__group"]}>
                    <IconButton
                        Icon={SidebarLeftIcon}
                        color={"primary"}
                        title={"close"}
                        onClick={handleOnToggleLeftPanelClick}
                    />
                    <IconButton
                        Icon={SidebarRightIcon}
                        color={"primary"}
                        title={"close"}
                        onClick={handleOnToggleRightPanelClick}
                    />
                </div>
                <div className={styles["editor-header__controls__group"]}>
                    <IconButton
                        Icon={ArrowTurnBackwardIcon}
                        color={"primary"}
                        title={"close"}
                        onClick={handleOnUndo}
                    />
                    <IconButton
                        Icon={ArrowTurnForwardIcon}
                        color={"primary"}
                        title={"close"}
                        onClick={handleOnRedo}
                    />
                </div>
            </section>
            <section className={styles["editor-header__path"]}>
                <h1>
                    {page.path}
                </h1>
            </section>
            <section className={styles["editor-header__actions"]}>
                <ul>
                    <li>
                        <IconButton
                            Icon={StartUp02Icon}
                            active={true}
                            color={"primary"}
                            title={"publish"}
                        >
                            {"publish"}
                        </IconButton>
                    </li>
                </ul>
            </section>
        </nav>
    );
};
