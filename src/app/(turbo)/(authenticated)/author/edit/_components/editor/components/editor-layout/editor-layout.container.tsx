"use client";

import { RefObject } from "react";
import { ImperativePanelHandle } from "react-resizable-panels";

import { Page } from "@turbo-cms/config/payload/payload.types";
import { ScreenSizeContextProvider } from "@turbo-cms/context/screen-size/screen-size.context";
import {
    AuthorSelectors,
    PanelTypeEnum,
    useAuthorStore
} from "@turbo-cms/store/author";
import { Cookie } from "@turbo-cms/types-models/network/cookie.enum";
import { stringifyJson } from "@turbo-cms/utils-general/object";

import { EditorLayoutComponent } from "./editor-layout.component";

type EditorLayoutProps = {
    page: Page;
    panelLayout: number[];
    leftPanelRef: RefObject<ImperativePanelHandle | null>;
    rightPanelRef: RefObject<ImperativePanelHandle | null>;
};

export const EditorLayout = ({
    page,
    panelLayout,
    leftPanelRef,
    rightPanelRef
}: EditorLayoutProps) => {
    const handleOnLayout = (sizes: number[]) => {
        document.cookie = `${Cookie.PANELS_LAYOUT_AUTHOR}=${stringifyJson(sizes)}`;
    };

    const setActivePanel = useAuthorStore(AuthorSelectors.setActivePanel);

    const createSetActivePanel =
        (panelType: PanelTypeEnum) =>
        () => setActivePanel(panelType);

    return (
        <ScreenSizeContextProvider throttle={100}>
            <EditorLayoutComponent
                createSetActivePanel={createSetActivePanel}
                leftPanelRef={leftPanelRef}
                page={page}
                panelLayout={panelLayout}
                rightPanelRef={rightPanelRef}
                onLayout={handleOnLayout}
            />
        </ScreenSizeContextProvider>
    );
};
