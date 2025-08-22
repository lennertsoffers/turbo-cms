"use client";

import classNames from "classnames";

import styles from "./field-config-form-label.module.scss";

type FieldConfigFormLabelComponentProps = {
    fieldName: string;
    section: boolean;
    title: boolean;
};

export const FieldConfigFormLabelComponent = ({
    fieldName,
    section,
    title
}: FieldConfigFormLabelComponentProps) => {
    return (
        <p className={classNames(
            styles["field-config-form-label"],
            section && styles["field-config-form-label--section"],
            title && styles["field-config-form-label--title"]
        )}
        >
            {fieldName}
        </p>
    );
};
