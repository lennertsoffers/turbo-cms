"use client";

import { RefObject } from "react";
import { ImperativePanelHandle } from "react-resizable-panels";

import { Page } from "@turbo-cms/config/payload/payload.types";

import { EditorHeader } from "./components/editor-header/editor-header.container";
import { EditorLayout } from "./components/editor-layout/editor-layout.container";

type EditorComponentProps = {
    page: Page;
    panelLayout: number[];
    leftPanelRef: RefObject<ImperativePanelHandle | null>;
    rightPanelRef: RefObject<ImperativePanelHandle | null>;
};

export const EditorComponent = ({
    page,
    panelLayout,
    leftPanelRef,
    rightPanelRef
}: EditorComponentProps) => {
    return (
        <>
            <EditorHeader
                leftPanelRef={leftPanelRef}
                page={page}
                rightPanelRef={rightPanelRef}
            />
            <EditorLayout
                leftPanelRef={leftPanelRef}
                page={page}
                panelLayout={panelLayout}
                rightPanelRef={rightPanelRef}
            />
        </>
    );
};
