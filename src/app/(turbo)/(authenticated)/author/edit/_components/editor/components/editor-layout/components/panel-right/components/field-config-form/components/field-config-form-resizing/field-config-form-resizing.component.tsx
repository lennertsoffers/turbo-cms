"use client";

import {
    ArrowHorizontalIcon,
    ArrowVerticalIcon
} from "hugeicons-react";

import { ResizingComposedFieldConfig } from "@turbo-cms/core/types/config/components/composed-field-config.model";

import { FieldConfigFormLabel } from "../../../field-config-form-label/field-config-form-label.container";
import { FieldConfigFormSpacer } from "../../../field-config-form-spacer/field-config-form-spacer.container";

import styles from "./field-config-form-resizing.module.scss";

type FieldConfigFormResizingComponentProps = {
    fieldConfig: ResizingComposedFieldConfig;
};

export const FieldConfigFormResizingComponent = ({ fieldConfig }: FieldConfigFormResizingComponentProps) => {
    return (
        <div>
            <FieldConfigFormLabel fieldName={"resizing"} />
            <div className={styles["field-config-form-resizing"]}>
                <div className={styles["field-config-form-resizing__item"]}>
                    <ArrowHorizontalIcon className={styles["field-config-form-resizing__item__icon"]} />
                    <select className={styles["field-config-form-resizing__item__select"]}>
                        {fieldConfig.horizontal.options.map(({ value, label }) => (
                            <option
                                key={value.toString()}
                                value={value.toString()}
                            >
                                {label}
                            </option>
                    ))}
                    </select>
                </div>
                <div className={styles["field-config-form-resizing__item"]}>
                    <ArrowVerticalIcon className={styles["field-config-form-resizing__item__icon"]} />
                    <select className={styles["field-config-form-resizing__item__select"]}>
                        {fieldConfig.vertical.options.map(({ value, label }) => (
                            <option
                                key={value.toString()}
                                value={value.toString()}
                            >
                                {label}
                            </option>
                    ))}
                    </select>
                </div>
                <FieldConfigFormSpacer />
            </div>
        </div>
    );
};
