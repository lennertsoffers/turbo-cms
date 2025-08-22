"use client";

import { RefObject } from "react";

import { VariableType } from "@turbo-cms/types-models/author/variable-type.enum";

import { FieldConfigFormSpacer } from "../../../field-config-form-spacer/field-config-form-spacer.container";
import {
    VariableInputChangeValueHandler,
    VariableInputField
} from "../../../variable-input-field/variable-input-field.container";

import styles from "./field-config-form-color.module.scss";

type FieldConfigFormColorComponentProps = {
    label: string;
    defaultValue: string;
    ref: RefObject<HTMLInputElement | null>;
    onVariableInputChange: VariableInputChangeValueHandler<typeof VariableType.COLOR>;
};

export const FieldConfigFormColorComponent = ({
    label,
    defaultValue,
    onVariableInputChange
}: FieldConfigFormColorComponentProps) => {
    const handleOnVariableInputChange = onVariableInputChange;

    return (
        <div className={styles["field-config-form-color"]}>
            <VariableInputField<typeof VariableType.COLOR>
                className={styles["field-config-form-color__input"]}
                defaultValue={defaultValue}
                label={label}
                variableType={VariableType.COLOR}
                onVariableInputChange={handleOnVariableInputChange}
            />
            <FieldConfigFormSpacer />
        </div>
    );
};
