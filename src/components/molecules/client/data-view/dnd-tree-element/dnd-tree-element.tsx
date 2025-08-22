"use client";

import {
    AnimateLayoutChanges,
    useSortable
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import classNames from "classnames";
import {
    CSSProperties,
    PropsWithChildren
} from "react";

import { Toggle } from "@/components/atoms/client/general/toggle/toggle";
import { Guide } from "@/components/atoms/shared/general/guide/guide";
import { FlatTreeElement } from "@/types/components/dnd/element.types";
import { Id } from "@/types/domain/id.types";
import { isNotEmpty } from "@/utils/general/array.utils";
import { isDefined } from "@/utils/general/object.utils";

import styles from "./dnd-tree-element.module.scss";

const animateLayoutChanges: AnimateLayoutChanges = ({
    isSorting,
    isDragging
}) => !isSorting && !isDragging;

type DndTreeElementProps<T extends { id: Id; }> = PropsWithChildren<{
    element: FlatTreeElement<T>;
    dragOffset: number;
    selection: T | null;
    onToggleOpen: (element: FlatTreeElement<T>) => void;
    onClick: () => void;
    getDepth: (element: FlatTreeElement<T>) => number;
}>;

export const DndTreeElement = <T extends { id: Id; }>({
    children,
    dragOffset,
    element,
    selection,
    getDepth,
    onToggleOpen,
    onClick
}: DndTreeElementProps<T>) => {
    const sortable = useSortable({
        id: element.id,
        animateLayoutChanges: animateLayoutChanges
    });

    const depth = getDepth(element);

    const anyActive = isDefined(sortable.active);

    const selected = isDefined(selection) && selection.id === element.id;

    const style: CSSProperties = {
        transform: anyActive
            ? CSS.Translate.toString(sortable.transform)
            : undefined,
        transition: anyActive
            ? sortable.transition
            : undefined,
        paddingLeft: `${dragOffset * depth}px`
    };

    const hasChildren = isNotEmpty(element.children);

    const handleOnToggleClick = () => onToggleOpen(element);

    const handleOnClick = onClick;

    return (
        <li
            {...sortable.attributes}
            {...sortable.listeners}
            className={classNames(
                styles["dnd-tree-element"],
                sortable.isDragging && styles["dnd-tree-element--dragging"],
                selected && styles["dnd-tree-element--selected"]
            )}
            aria-describedby={undefined}
            ref={sortable.setNodeRef}
            style={style}
            onClick={handleOnClick}
        >
            <Guide
                depth={depth}
                guideOffset={dragOffset}
                initialOffset={11}
            />
            {!!hasChildren && (
                <Toggle
                    collapsed={element.collapsed}
                    onClick={handleOnToggleClick}
                />
            )}
            {children}
        </li>
    );
};
