"use client";

import classNames from "classnames";
import { ComponentProps } from "react";

import { mergeRefs } from "@/utils/react/ref/merge-refs.utils";

import { useInputFieldContext } from "../../context/input-field.context";

import styles from "./input.module.scss";

type InputFieldInputProps = ComponentProps<"input">;

export const InputFieldInput = ({
    ref,
    className,
    ...inputProps
}: InputFieldInputProps) => {
    const { inputRef } = useInputFieldContext();

    const mergedRef = mergeRefs(
        ref,
        inputRef
    );

    return (
        <input
            {...inputProps}
            className={classNames(
                styles["input"],
                className
            )}
            ref={mergedRef}
        />
    );
};
