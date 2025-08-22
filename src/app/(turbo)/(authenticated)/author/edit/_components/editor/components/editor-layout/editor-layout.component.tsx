"use client";

import classNames from "classnames";
import { RefObject } from "react";
import {
    ImperativePanelHandle,
    Panel,
    PanelGroup,
    PanelResizeHandle
} from "react-resizable-panels";

import { Page } from "@turbo-cms/config/payload/payload.types";
import { useScreenSizeContext } from "@turbo-cms/context/screen-size/screen-size.context";
import {
    PanelType,
    PanelTypeEnum
} from "@turbo-cms/store/author";

import { DEFAULT_PANEL_LAYOUT } from "../../../../config";

import { PanelCenter } from "./components/panel-center/panel-center.container";
import { PanelLeft } from "./components/panel-left/panel-left.containert";
import { PanelRight } from "./components/panel-right/panel-right.container";
import {
    PANEL_MAX_WIDTH,
    PANEL_MIN_WIDTH
} from "./editor-layout.config";

import styles from "./editor-layout.module.scss";

type EditorLayoutComponentProps = {
    page: Page;
    panelLayout: number[];
    createSetActivePanel: (panelType: PanelTypeEnum) => () => void;
    onLayout: (sizes: number[]) => void;
    leftPanelRef: RefObject<ImperativePanelHandle | null>;
    rightPanelRef: RefObject<ImperativePanelHandle | null>;
};

export const EditorLayoutComponent = ({
    page: _page,
    panelLayout,
    createSetActivePanel,
    onLayout,
    leftPanelRef,
    rightPanelRef
}: EditorLayoutComponentProps) => {
    const handleOnLayout = onLayout;

    const { width } = useScreenSizeContext();
    const minSize = PANEL_MIN_WIDTH / width * 100;
    const maxSize = PANEL_MAX_WIDTH / width * 100;
    const leftPanelSize = (panelLayout.at(0) ?? DEFAULT_PANEL_LAYOUT.at(0) ?? 0) / width * 100;
    const centerPanelSize = (panelLayout.at(1) ?? DEFAULT_PANEL_LAYOUT.at(0) ?? 1) / width * 100;
    const rightPanelSize = (panelLayout.at(2) ?? DEFAULT_PANEL_LAYOUT.at(0) ?? 2) / width * 100;

    return (
        <PanelGroup
            className={styles["editor-layout"]}
            direction={"horizontal"}
            tagName={"article"}
            onLayout={handleOnLayout}
        >
            <Panel
                className={classNames(
                    styles["editor-layout__left"],
                    styles["editor-layout__panel"]
                )}
                collapsedSize={0}
                collapsible={true}
                defaultSize={leftPanelSize}
                maxSize={maxSize}
                minSize={minSize}
                ref={leftPanelRef}
                tagName={"section"}
                onMouseDownCapture={createSetActivePanel(PanelType.LEFT)}
            >
                <PanelLeft className={styles["editor-layout__panel__content"]} />
            </Panel>
            <PanelResizeHandle className={styles["editor-layout__handle"]} />
            <Panel
                className={classNames(
                    styles["editor-layout__center"],
                    styles["editor-layout__canvas"]
                )}
                defaultSize={centerPanelSize}
                tagName={"section"}
                onMouseDownCapture={createSetActivePanel(PanelType.CENTER)}
            >
                <PanelCenter />
            </Panel>
            <PanelResizeHandle className={styles["editor-layout__handle"]} />
            <Panel
                className={classNames(
                    styles["editor-layout__right"],
                    styles["editor-layout__panel"]
                )}
                collapsedSize={0}
                collapsible={true}
                defaultSize={rightPanelSize}
                maxSize={maxSize}
                minSize={minSize}
                ref={rightPanelRef}
                tagName={"section"}
                onMouseDownCapture={createSetActivePanel(PanelType.RIGHT)}
            >
                <PanelRight className={styles["editor-layout__panel__content"]} />
            </Panel>
        </PanelGroup>
    );
};
