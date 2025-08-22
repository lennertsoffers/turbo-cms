"use client";

import {
    ColorInputField,
    ColorStaticField,
    DefaultInputField,
    DefaultStaticField,
    EditableStaticField
} from "@turbo-cms/components-general/client/data-view/editable-static-field";
import { Variable } from "@turbo-cms/config/payload/payload.types";
import { ColorVariable } from "@turbo-cms/types-models/author/variable.types";
import { Id } from "@turbo-cms/types-models/id.types";

import styles from "./color-variable-row.module.scss";

type ColorVariableRowProps = {
    variable: ColorVariable;
    updateVariable: (variable: { id: Id; } & Partial<Variable>) => void;
};

export const ColorVariableRow = ({
    variable,
    updateVariable
}: ColorVariableRowProps) => {
    const handleOnSetNameValue = (value: string) => {
        updateVariable({
            id: variable.id,
            name: value
        });
    };

    const handleOnSetColorValue = (value: string) => {
        updateVariable({
            "id": variable.id,
            "color-value": value
        });
    };

    console.log(variable);

    return (
        <div className={styles["color-variable-row"]}>
            <EditableStaticField
                InputField={(props) => (
                    <DefaultInputField
                        {...props}
                        className={styles["color-variable-row__item"]}
                    />
                )}
                StaticField={(props) => (
                    <DefaultStaticField
                        {...props}
                        className={styles["color-variable-row__item"]}
                    />
                )}
                inputType={"text"}
                key={variable.name}
                value={variable.name}
                onSetValue={handleOnSetNameValue}
            />
            <EditableStaticField
                InputField={(props) => (
                    <ColorInputField
                        {...props}
                        className={styles["color-variable-row__item"]}
                    />
                )}
                StaticField={(props) => (
                    <ColorStaticField
                        {...props}
                        className={styles["color-variable-row__item"]}
                    />
                )}
                inputType={"text"}
                key={variable["color-value"]}
                value={variable["color-value"]}
                onSetValue={handleOnSetColorValue}
            />
        </div>
    );
};
