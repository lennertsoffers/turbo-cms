"use client";

import {
    DragOverlay,
    Modifiers
} from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy
} from "@dnd-kit/sortable";
import classNames from "classnames";
import { FC } from "react";
import { createPortal } from "react-dom";

import { DndTreeElement } from "@/components/molecules/client/data-view/dnd-tree-element/dnd-tree-element";
import {
    ElementProjection,
    FlatTreeElement
} from "@/types/components/dnd/element.types";
import { Selections } from "@/types/components/dnd/selection.types";
import { Id } from "@/types/domain/id.types";
import { isDefined } from "@/utils/general/object.utils";
import { isClient } from "@/utils/next/environment.utils";

import { DndConfig } from "./configs/dnd.config";
import { buildTreeElement } from "./helpers/tree.helpers";

import styles from "./dnd-tree.module.scss";

type DndTreeComponentProps<T extends { id: Id; }> = {
    elements: FlatTreeElement<T>[];
    elementIds: Id[];
    activeElement: FlatTreeElement<T> | undefined;
    projection: ElementProjection | undefined;
    dragOverlayModifiers: Modifiers;
    dragOffset: number;
    selections: Selections;
    className?: string;
    Element: FC<{
        element: T;
        className?: string;
    }>;
    getDepth: (element: FlatTreeElement<T>) => number;
    onToggleOpen: (page: FlatTreeElement<T>) => void;
    onSelect: (selection: Selections<T>["lastSelection"]) => void;
    onDropAnimationCleanup: () => void;
};

export const DndTreeComponent = <T extends { id: Id; }>({
    elements,
    elementIds,
    activeElement,
    projection,
    dragOverlayModifiers,
    dragOffset,
    selections,
    className,
    Element,
    getDepth,
    onToggleOpen,
    onSelect,
    onDropAnimationCleanup
}: DndTreeComponentProps<T>) => {
    const handleOnToggleOpen = onToggleOpen;
    const handleOnDropAnimationCleanup = onDropAnimationCleanup;

    const dropAnimation = DndConfig.getDropAnimation(
        handleOnDropAnimationCleanup,
        projection?.depth
    );

    const getClassName = ({ id }: FlatTreeElement<T>) => id === activeElement?.id
        ? styles["dnd-tree__element--active"]
        : undefined;

    const createHandleOnClick =
        (flatTreeElement: FlatTreeElement<T>) =>
        () => onSelect(buildTreeElement(flatTreeElement));

    return (
        <ul className={classNames(
            styles["dnd-tree"],
            className
        )}
        >
            <SortableContext
                items={elementIds}
                strategy={verticalListSortingStrategy}
            >
                {elements.map((element) => (
                    <DndTreeElement
                        dragOffset={dragOffset}
                        element={element}
                        getDepth={getDepth}
                        key={element.id}
                        selections={selections}
                        onClick={createHandleOnClick(element)}
                        onToggleOpen={handleOnToggleOpen}
                    >
                        <Element
                            className={getClassName(element)}
                            element={element}
                        />
                    </DndTreeElement>
                ))}
                {isClient() && createPortal(
                    <DragOverlay
                        className={styles["dnd-tree__drag-overlay"]}
                        dropAnimation={dropAnimation}
                        modifiers={dragOverlayModifiers}
                    >
                        {isDefined(activeElement) && (
                            <Element element={activeElement} />
                        )}
                    </DragOverlay>,
                    document.body
                )}
            </SortableContext>
        </ul>
    );
};
