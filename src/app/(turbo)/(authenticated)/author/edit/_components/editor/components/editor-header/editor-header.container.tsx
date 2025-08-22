"use client";

import { RefObject } from "react";
import { ImperativePanelHandle } from "react-resizable-panels";

import { Page } from "@turbo-cms/config/payload/payload.types";
import { useAuthorStoreContext } from "@turbo-cms/store/author";
import { isDefined } from "@turbo-cms/utils-general/object";

import { EditorHeaderComponent } from "./editor-header.component";
import { togglePanel } from "./helpers/panel.helpers";

type EditorHeaderProps = {
    page: Page;
    leftPanelRef: RefObject<ImperativePanelHandle | null>;
    rightPanelRef: RefObject<ImperativePanelHandle | null>;
};

export const EditorHeader = ({
    page,
    leftPanelRef,
    rightPanelRef
}: EditorHeaderProps) => {
    const { temporal } = useAuthorStoreContext();
    const { undo, redo } = temporal.getState();

    const handleOnUndo = () => undo();
    const handleOnRedo = () => redo();

    const createOnTogglePanelHandler =
        (panelRef: RefObject<ImperativePanelHandle | null>) =>
        () => {
            if(!isDefined(panelRef.current)) return;
            togglePanel(panelRef.current);
        };

    return (
        <EditorHeaderComponent
            page={page}
            onRedo={handleOnRedo}
            onToggleLeftPanel={createOnTogglePanelHandler(leftPanelRef)}
            onToggleRightPanel={createOnTogglePanelHandler(rightPanelRef)}
            onUndo={handleOnUndo}
        />
    );
};
