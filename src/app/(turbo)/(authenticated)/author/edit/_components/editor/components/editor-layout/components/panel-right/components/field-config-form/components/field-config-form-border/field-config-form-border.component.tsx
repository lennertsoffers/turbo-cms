"use client";

import {
    BorderAll01Icon,
    BorderBottom01Icon,
    BorderLeft01Icon,
    BorderRight01Icon,
    BorderTop01Icon,
    SquareIcon
} from "hugeicons-react";

import { BorderComposedFieldConfig } from "@turbo-cms/core/types/config/components/composed-field-config.model";
import { FieldOptionConfig } from "@turbo-cms/core/types/config/components/field-config.model";

import { FieldConfigFormLabel } from "../../../field-config-form-label/field-config-form-label.container";
import { FieldConfigFormToggle } from "../../../field-config-form-toggle/field-config-form-toggle.container";

import { FormFieldBorder } from "./components/form-field-border/form-field-border.container";

import styles from "./field-config-form-border.module.scss";

type FieldConfigFormBorderComponentProps = {
    individualBorders: boolean;
    fieldConfig: BorderComposedFieldConfig;
    onToggleMore: (more: boolean) => void;
};

export const FieldConfigFormBorderComponent = ({
    individualBorders,
    fieldConfig,
    onToggleMore
}: FieldConfigFormBorderComponentProps) => {
    const handleOnToggleMore = onToggleMore;

    const borderStyleOptionsMap = new Map<boolean | number | string, FieldOptionConfig>();

    [
        ...fieldConfig.borderTopStyle.options,
        ...fieldConfig.borderTopStyle.options,
        ...fieldConfig.borderTopStyle.options,
        ...fieldConfig.borderTopStyle.options
    ].forEach((option) => borderStyleOptionsMap.set(
        option.value,
        option
    ));

    const BorderStyleOptions = borderStyleOptionsMap
        .values()
        .toArray()
        .map(
            ({ value, label }) => (
                <option
                    key={value.toString()}
                    value={value.toString()}
                >
                    {label}
                </option>
            )
        );

    return (
        <div>
            <FieldConfigFormLabel fieldName={"borders"} />
            <div className={styles["field-config-form-border"]}>
                <div className={styles["field-config-form-border__inputs"]}>
                    {!individualBorders && (
                        <FormFieldBorder
                            BorderStyleOptions={BorderStyleOptions}
                            Icon={BorderAll01Icon}
                        />
                    )}
                    {individualBorders && (
                        <>
                            <FormFieldBorder
                                BorderStyleOptions={BorderStyleOptions}
                                Icon={BorderTop01Icon}
                            />
                            <FormFieldBorder
                                BorderStyleOptions={BorderStyleOptions}
                                Icon={BorderBottom01Icon}
                            />
                            <FormFieldBorder
                                BorderStyleOptions={BorderStyleOptions}
                                Icon={BorderLeft01Icon}
                            />
                            <FormFieldBorder
                                BorderStyleOptions={BorderStyleOptions}
                                Icon={BorderRight01Icon}
                            />
                        </>
                    )}
                </div>
                <FieldConfigFormToggle
                    Icon={SquareIcon}
                    tooltip={"edit individual borders"}
                    onToggleMore={handleOnToggleMore}
                />
            </div>
        </div>
    );
};
