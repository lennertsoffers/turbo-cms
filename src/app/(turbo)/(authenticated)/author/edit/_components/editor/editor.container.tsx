"use client";

import { DndContext } from "@dnd-kit/core";
import {
    useEffect,
    useMemo,
    useRef
} from "react";
import { ImperativePanelHandle } from "react-resizable-panels";

import { Page } from "@turbo-cms/config/payload/payload.types";
import { ComponentModel } from "@turbo-cms/core/types/config/components/component.model";
import {
    AuthorSelectors,
    useAuthorStore
} from "@turbo-cms/store/author";
import { isDefined } from "@turbo-cms/utils-general/object";

import { getDropZoneIds } from "../../_helpers/dnd.helpers";

import { EditorContextProvider } from "./context/editor.context";
import { EditorComponent } from "./editor.component";
import { createCollisionDetection } from "./helpers/collision-detection.helpers";
import { useDndSensors } from "./hooks/use-dnd-sensors.hook";
import { useHandleOnDragCancel } from "./hooks/use-handle-on-drag-cancel.hook";
import { useHandleOnDragEnd } from "./hooks/use-handle-on-drag-end.hook";
import { useHandleOnDragOver } from "./hooks/use-handle-on-drag-over.hook";
import { useHandleOnDragStart } from "./hooks/use-handle-on-drag-start.hook";

type EditorProps = {
    page: Page;
    panelLayout: number[];
    rootComponent: ComponentModel;
};

export const Editor = ({
    panelLayout,
    page,
    rootComponent
}: EditorProps) => {
    const component = useAuthorStore(AuthorSelectors.getComponent);
    const setComponent = useAuthorStore(AuthorSelectors.setComponent);

    const activeParent = useAuthorStore(AuthorSelectors.getActiveParent);
    const selectedComponent = useAuthorStore(AuthorSelectors.getSelectedComponent);

    const leftPanelRef = useRef<ImperativePanelHandle>(null);
    const rightPanelRef = useRef<ImperativePanelHandle>(null);
    const copyComponentRef = useRef<ComponentModel | undefined>(component);

    const sensors = useDndSensors();

    const collisionDetection = useMemo(
        () => {
            const dropZoneIds = isDefined(component)
                ? getDropZoneIds(component)
                : [];

            return createCollisionDetection(
                dropZoneIds,
                activeParent,
                selectedComponent
            );
        },
        [
            activeParent,
            selectedComponent,
            component
        ]
    );

    const handleOnDragStart = useHandleOnDragStart({
        copyComponentRef: copyComponentRef
    });

    const handleOnDragCancel = useHandleOnDragCancel({
        copyComponentRef: copyComponentRef
    });

    const handleOnDragOver = useHandleOnDragOver();

    const handleOnDragEnd = useHandleOnDragEnd();

    useEffect(
        () => {
            if(isDefined(component)) return;

            setComponent(rootComponent);
        },
        []
    );

    if(!isDefined(component)) return null;

    return (
        <EditorContextProvider>
            <DndContext
                collisionDetection={collisionDetection}
                sensors={sensors}
                onDragCancel={handleOnDragCancel}
                onDragEnd={handleOnDragEnd}
                onDragOver={handleOnDragOver}
                onDragStart={handleOnDragStart}
            >
                <EditorComponent
                    leftPanelRef={leftPanelRef}
                    page={page}
                    panelLayout={panelLayout}
                    rightPanelRef={rightPanelRef}
                />
            </DndContext>
        </EditorContextProvider>
    );
};
