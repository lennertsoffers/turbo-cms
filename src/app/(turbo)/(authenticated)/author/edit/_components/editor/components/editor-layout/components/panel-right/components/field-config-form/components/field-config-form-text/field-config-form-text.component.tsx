"use client";

import { TextIcon } from "hugeicons-react";
import { RefObject } from "react";

import { VariableType } from "@turbo-cms/types-models/author/variable-type.enum";

import { FieldConfigFormSpacer } from "../../../field-config-form-spacer/field-config-form-spacer.container";
import {
    VariableInputChangeValueHandler,
    VariableInputField
} from "../../../variable-input-field/variable-input-field.container";

import styles from "./field-config-form-text.module.scss";

type FieldConfigFormTextComponentProps = {
    label: string;
    defaultValue: string;
    ref: RefObject<HTMLInputElement | null>;
    onVariableInputChange: VariableInputChangeValueHandler<typeof VariableType.TEXT>;
};

export const FieldConfigFormTextComponent = ({
    label,
    defaultValue,
    ref,
    onVariableInputChange
}: FieldConfigFormTextComponentProps) => {
    const handleOnChange = onVariableInputChange;

    return (
        <div className={styles["field-config-form-text"]}>
            <VariableInputField<typeof VariableType.TEXT>
                Icon={TextIcon}
                className={styles["field-config-form-text__input"]}
                defaultValue={defaultValue}
                label={label}
                ref={ref}
                tooltip={"ice cream"}
                variableType={VariableType.TEXT}
                onVariableInputChange={handleOnChange}
            />
            <FieldConfigFormSpacer />
        </div>
    );
};
