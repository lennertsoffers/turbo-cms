"use client";

import classNames from "classnames";
import { ArrowRight01Icon } from "hugeicons-react";
import { MouseEvent } from "react";

import styles from "./toggle.module.scss";

type ToggleProps = {
    collapsed: boolean;
    onClick: () => void;
    className?: string;
};

export const Toggle = ({
    collapsed,
    onClick,
    className
}: ToggleProps) => {
    const handleOnClick = (event: MouseEvent) => {
        event.stopPropagation();
        onClick();
    };

    return (
        <button
            className={classNames(
                className,
                styles["toggle"],
                !collapsed && styles["toggle--open"]
            )}
            type={"button"}
            onClick={handleOnClick}
        >
            <ArrowRight01Icon />
        </button>
    );
};
