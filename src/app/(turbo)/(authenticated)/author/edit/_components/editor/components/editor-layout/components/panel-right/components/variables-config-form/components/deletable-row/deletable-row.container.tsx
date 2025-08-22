"use client";

import * as ContextMenu from "@radix-ui/react-context-menu";
import { Delete02Icon } from "hugeicons-react";
import { PropsWithChildren } from "react";

import { Variable } from "@turbo-cms/config/payload/payload.types";

import styles from "./deletable-row.module.scss";

type DeletableRowProps = PropsWithChildren<{
    variable: Variable;
    deleteVariable: (variable: Variable) => void;
}>;

export const DeletableRow = ({
    variable,
    deleteVariable,
    children
}: DeletableRowProps) => {
    const handleOnDeleteClick = () => deleteVariable(variable);

    return (
        <ContextMenu.Root>
            <ContextMenu.Trigger asChild>
                <div className={styles["deletable-row__content"]}>
                    {children}
                </div>
            </ContextMenu.Trigger>
            <ContextMenu.Portal>
                <ContextMenu.Content className={styles["deletable-row__dropdown"]}>
                    <ContextMenu.Item
                        className={styles["deletable-row__dropdown__item"]}
                        itemType={"button"}
                        onClick={handleOnDeleteClick}
                    >
                        <Delete02Icon className={styles["deletable-row__dropdown__item__icon"]} />
                        <span>
                            {"delete"}
                        </span>
                    </ContextMenu.Item>
                </ContextMenu.Content>
            </ContextMenu.Portal>
        </ContextMenu.Root>
    );
};
