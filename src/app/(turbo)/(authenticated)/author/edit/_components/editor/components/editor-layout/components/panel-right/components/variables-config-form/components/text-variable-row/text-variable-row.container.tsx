"use client";

import {
    DefaultInputField,
    DefaultStaticField,
    EditableStaticField
} from "@turbo-cms/components-general/client/data-view/editable-static-field";
import { Variable } from "@turbo-cms/config/payload/payload.types";
import { TextVariable } from "@turbo-cms/types-models/author/variable.types";
import { Id } from "@turbo-cms/types-models/id.types";

import styles from "./text-variable-row.module.scss";

type TextVariableRowProps = {
    variable: TextVariable;
    updateVariable: (variable: { id: Id; } & Partial<Variable>) => void;
};

export const TextVariableRow = ({
    variable,
    updateVariable
}: TextVariableRowProps) => {
    const handleOnSetNameValue = (value: string) => {
        updateVariable({
            id: variable.id,
            name: value
        });
    };

    const handleOnSetTextValue = (value: string) => {
        updateVariable({
            "id": variable.id,
            "text-value": value
        });
    };

    return (
        <div className={styles["text-variable-row"]}>
            <EditableStaticField
                InputField={(props) => (
                    <DefaultInputField
                        {...props}
                        className={styles["text-variable-row__item"]}
                    />
                )}
                StaticField={(props) => (
                    <DefaultStaticField
                        {...props}
                        className={styles["text-variable-row__item"]}
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
                        className={styles["text-variable-row__item"]}
                    />
                )}
                StaticField={(props) => (
                    <DefaultStaticField
                        {...props}
                        className={styles["text-variable-row__item"]}
                    />
                )}
                inputType={"text"}
                key={variable["text-value"]}
                value={variable["text-value"]}
                onSetValue={handleOnSetTextValue}
            />
        </div>
    );
};
