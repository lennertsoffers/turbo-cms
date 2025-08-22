"use client";

import { useDraggable } from "@dnd-kit/core";
import { DragDropVerticalIcon } from "hugeicons-react";

import { NEW_COMPONENT_PLACEHOLDER_ID_PREFIX } from "../../../../../../../../../../config";

import styles from "./component.module.scss";

type ComponentComponentProps = {
    name: string;
    Icon: JSX.Element;
};

export const ComponentComponent = ({
    name,
    Icon
}: ComponentComponentProps) => {
    const { setNodeRef, listeners, attributes } = useDraggable({
        id: `${NEW_COMPONENT_PLACEHOLDER_ID_PREFIX}${name}`
    });

    return (
        <li
            className={styles["component"]}
            ref={setNodeRef}
            {...listeners}
            {...attributes}
        >
            <span className={styles["component__icon"]}>
                {Icon}
            </span>
            {name}
            <span className={styles["component__handle"]}>
                <DragDropVerticalIcon />
            </span>
        </li>
    );
};
