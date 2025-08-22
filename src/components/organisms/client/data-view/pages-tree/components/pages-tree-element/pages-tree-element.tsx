"use client";

import classNames from "classnames";

import { FullPage } from "@/types/components/dnd/page.types";

import { getIcon } from "../../helpers/page.helpers";

import styles from "./pages-tree-element.module.scss";

type PagesTreeElementProps = {
    element: FullPage;
    className?: string;
};

export const PagesTreeElement = ({
    element,
    className
}: PagesTreeElementProps) => {
    const Icon = getIcon(element);

    return (
        <div className={classNames(
            styles["pages-tree-element"],
            className
        )}
        >
            <Icon />
            <span>
                {element.title}
            </span>
        </div>
    );
};
