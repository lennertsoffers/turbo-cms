"use client";

import {
    DefaultInputField,
    DefaultStaticField,
    EditableStaticField
} from "@turbo-cms/components-general/client/data-view/editable-static-field";
import { Variable } from "@turbo-cms/config/payload/payload.types";
import { NumberVariable } from "@turbo-cms/types-models/author/variable.types";
import { Id } from "@turbo-cms/types-models/id.types";

import styles from "./number-variable-row.module.scss";

type NumberVariableRowProps = {
    variable: NumberVariable;
    updateVariable: (variable: { id: Id; } & Partial<Variable>) => void;
};

export const NumberVariableRow = ({
    variable,
    updateVariable
}: NumberVariableRowProps) => {
    const handleOnSetNameValue = (value: string) => {
        updateVariable({
            id: variable.id,
            name: value
        });
    };

    const handleOnSetNumberValue = (value: string) => {
        const numberValue = parseFloat(value);
        if(isNaN(numberValue)) return;
        if(!isFinite(numberValue)) return;

        updateVariable({
            "id": variable.id,
            "number-value": numberValue
        });
    };

    return (
        <div className={styles["number-variable-row"]}>
            <EditableStaticField
                InputField={(props) => (
                    <DefaultInputField
                        {...props}
                        className={styles["number-variable-row__item"]}
                    />
                )}
                StaticField={(props) => (
                    <DefaultStaticField
                        {...props}
                        className={styles["number-variable-row__item"]}
                    />
                )}
                inputType={"text"}
                key={variable.name}
                value={variable.name}
                onSetValue={handleOnSetNameValue}
            />
            <EditableStaticField
                InputField={(props) => (
                    <DefaultInputField
                        {...props}
                        className={styles["number-variable-row__item"]}
                    />
                )}
                StaticField={(props) => (
                    <DefaultStaticField
                        {...props}
                        className={styles["number-variable-row__item"]}
                    />
                )}
                inputType={"number"}
                key={variable["number-value"]}
                value={variable["number-value"].toString()}
                onSetValue={handleOnSetNumberValue}
            />
        </div>
    );
};
