"use client";

import classNames from "classnames";
import { PropsWithChildren } from "react";

import { Id } from "@turbo-cms/types-models/id.types";

import styles from "./author-renderer.module.scss";

type AuthorRendererComponentProps = PropsWithChildren<{
    id: Id;
    active: boolean;
    selected: boolean;
    over: boolean;
    hoveredComponent: boolean;
    hoveredParentComponent: boolean;
}>;

export const AuthorRendererComponent = ({
    id,
    active,
    selected,
    over,
    hoveredComponent,
    hoveredParentComponent,
    children
}: AuthorRendererComponentProps) => {
    return (
        <div
            className={classNames(
                styles["author-renderer__wrapper"],
                hoveredComponent && styles["author-renderer__wrapper--hovered"],
                hoveredParentComponent && styles["author-renderer__wrapper--hovered-parent"],
                selected && styles["author-renderer__wrapper--selected"],
                active && styles["author-renderer__wrapper--active"],
                over && styles["author-renderer__wrapper--over"]
            )}
            data-author-component-id={id}
        >
            {children}
        </div>
    );
};
