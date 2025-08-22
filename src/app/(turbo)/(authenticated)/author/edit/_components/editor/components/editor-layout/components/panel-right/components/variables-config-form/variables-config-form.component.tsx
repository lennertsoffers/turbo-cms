"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ArrowDown01Icon } from "hugeicons-react";

import { Variable } from "@turbo-cms/config/payload/payload.types";
import { VariableType } from "@turbo-cms/types-models/author/variable-type.enum";
import { Id } from "@turbo-cms/types-models/id.types";

import { ColorVariableRow } from "./components/color-variable-row/color-variable-row.container";
import { DeletableRow } from "./components/deletable-row/deletable-row.container";
import { NumberVariableRow } from "./components/number-variable-row/number-variable-row.container";
import { TextVariableRow } from "./components/text-variable-row/text-variable-row.container";
import {
    isColorVariable,
    isNumberVariable,
    isTextVariable
} from "./helpers/variable-type.helpers";

import styles from "./variables-config-form.module.scss";

type VariablesConfigFormComponentProps = {
    variables: Variable[];
    updateVariable: (variable: { id: Id; } & Partial<Variable>) => void;
    deleteVariable: (variable: Variable) => void;
};

export const VariablesConfigFormComponent = ({
    variables,
    updateVariable,
    deleteVariable
}: VariablesConfigFormComponentProps) => {
    const textVariables = variables.filter(isTextVariable);
    const colorVariables = variables.filter(isColorVariable);
    const numberVariables = variables.filter(isNumberVariable);

    return (
        <>
            <p>
                {"Variables"}
            </p>
            <Accordion.Root
                className={styles["variables-config-form__accordion"]}
                collapsible
                defaultValue={VariableType.TEXT}
                type={"single"}
            >
                <Accordion.Item
                    className={styles["variables-config-form__accordion__item"]}
                    value={VariableType.TEXT}
                >
                    <Accordion.Header>
                        <Accordion.Trigger className={styles["variables-config-form__accordion__trigger"]}>
                            <span>
                                {"Text variables"}
                            </span>
                            <ArrowDown01Icon aria-hidden />
                        </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className={styles["variables-config-form__accordion__content"]}>
                        <div className={styles["variables-config-form__table__header"]}>
                            <p>
                                {"Name"}
                            </p>
                            <p>
                                {"Value"}
                            </p>
                        </div>
                        {textVariables.map((variable) => (
                            <DeletableRow
                                deleteVariable={deleteVariable}
                                key={variable.id}
                                variable={variable}
                            >
                                <TextVariableRow
                                    updateVariable={updateVariable}
                                    variable={variable}
                                />
                            </DeletableRow>
                        ))}
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item
                    className={styles["variables-config-form__accordion__item"]}
                    value={VariableType.COLOR}
                >
                    <Accordion.Header>
                        <Accordion.Trigger className={styles["variables-config-form__accordion__trigger"]}>
                            <span>
                                {"Color variables"}
                            </span>
                            <ArrowDown01Icon aria-hidden />
                        </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className={styles["variables-config-form__accordion__content"]}>
                        <div className={styles["variables-config-form__table__header"]}>
                            <p>
                                {"Name"}
                            </p>
                            <p>
                                {"Value"}
                            </p>
                        </div>
                        {colorVariables.map((variable) => (
                            <DeletableRow
                                deleteVariable={deleteVariable}
                                key={variable.id}
                                variable={variable}
                            >
                                <ColorVariableRow
                                    key={variable.id}
                                    updateVariable={updateVariable}
                                    variable={variable}
                                />
                            </DeletableRow>
                        ))}
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item
                    className={styles["variables-config-form__accordion__item"]}
                    value={VariableType.NUMBER}
                >
                    <Accordion.Header>
                        <Accordion.Trigger className={styles["variables-config-form__accordion__trigger"]}>
                            <span>
                                {"Number variables"}
                            </span>
                            <ArrowDown01Icon aria-hidden />
                        </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className={styles["variables-config-form__accordion__content"]}>
                        <div className={styles["variables-config-form__table__header"]}>
                            <p>
                                {"Name"}
                            </p>
                            <p>
                                {"Value"}
                            </p>
                        </div>

                        {numberVariables.map((variable) => (
                            <DeletableRow
                                deleteVariable={deleteVariable}
                                key={variable.id}
                                variable={variable}
                            >
                                <NumberVariableRow
                                    key={variable.id}
                                    updateVariable={updateVariable}
                                    variable={variable}
                                />
                            </DeletableRow>
                       ))}
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion.Root>
        </>
    );
};
