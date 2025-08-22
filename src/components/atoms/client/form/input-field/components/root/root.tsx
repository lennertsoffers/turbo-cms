"use client";

import classNames from "classnames";
import { ReactNode } from "react";

import { useInputFieldContext } from "../../context/input-field.context";

import styles from "./root.module.scss";

type InputFieldRootProps = {
    className?: string;
    children: ReactNode;
};

export const InputFieldRoot = ({
    className,
    children
}: InputFieldRootProps) => {
    const { inputRef } = useInputFieldContext();

    const handleOnClick = () => inputRef.current?.focus();

    return (
        <span
            className={
                classNames(
                    styles["root"],
                    className
                )
            }
            onClick={handleOnClick}
        >
            {children}
        </span>
    );
};
