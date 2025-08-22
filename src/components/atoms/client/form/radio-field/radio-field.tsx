"use client";

import classNames from "classnames";
import { ChangeEvent } from "react";

import { Enum } from "@/utils/type/enum.utils";

import { RadioOption } from "./types/radio-option.types";

import styles from "./radio-field.module.scss";

type RadioFieldProps<T extends Record<string, string>> = {
    name: string;
    options: RadioOption<T>[];
    className?: string;
    onSelect?: (value: Enum<T>) => void;
};

export const RadioField = <T extends Record<string, string>>({
    name,
    options,
    className,
    onSelect
}: RadioFieldProps<T>) => {
    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        onSelect?.(event.target.value as Enum<T>);
    };

    return (
        <p className={classNames(
            styles["radio-field"],
            className
        )}
        >
            {options.map(({ label, value, Icon, defaultChecked }) => (
                <label
                    className={styles["radio-field__label"]}
                    key={value}
                >
                    <span>
                        {!!Icon && <Icon />}
                        {label}
                    </span>
                    <input
                        className={styles["radio-field__input"]}
                        defaultChecked={defaultChecked}
                        name={name}
                        type={"radio"}
                        value={value}
                        onChange={handleOnChange}
                    />
                </label>
            ))}
        </p>
    );
};
