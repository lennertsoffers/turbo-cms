"use client";

import { RefObject } from "react";

import { IconComponent } from "@turbo-cms/types-components/components/icon";
import { VariableType } from "@turbo-cms/types-models/author/variable-type.enum";

import { FieldConfigFormSpacer } from "../../../field-config-form-spacer/field-config-form-spacer.container";
import {
    VariableInputChangeValueHandler,
    VariableInputField
} from "../../../variable-input-field/variable-input-field.container";

import styles from "./field-config-form-number.module.scss";

type FieldConfigFormNumberComponentProps = {
    label: string;
    defaultValue: string;
    ref: RefObject<HTMLInputElement | null>;
    Icon?: IconComponent;
    onVariableInputChange: VariableInputChangeValueHandler<typeof VariableType.NUMBER>;
};

export const FieldConfigFormNumberComponent = ({
    label,
    defaultValue,
    Icon,
    onVariableInputChange
}: FieldConfigFormNumberComponentProps) => {
    const handleOnVariableInputChange = onVariableInputChange;

    return (
        <div className={styles["field-config-form-number"]}>
            <VariableInputField<typeof VariableType.NUMBER>
                Icon={Icon}
                className={styles["field-config-form-number__input"]}
                defaultValue={defaultValue}
                label={label}
                variableType={VariableType.NUMBER}
                onVariableInputChange={handleOnVariableInputChange}
            />
            <FieldConfigFormSpacer />
        </div>
    );
};
