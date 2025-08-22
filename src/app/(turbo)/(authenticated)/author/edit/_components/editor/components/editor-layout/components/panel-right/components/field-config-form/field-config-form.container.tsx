"use client";

import { Fragment } from "react";

import { getComponentConfig } from "@turbo-cms/core/config/components/component-map.config";
import { ComponentModel } from "@turbo-cms/core/types/config/components/component.model";
import { isDefined } from "@turbo-cms/utils-general/object";

import { FieldConfigFormComponent } from "./field-config-form.component";

import styles from "./field-config-form.module.scss";

type FieldConfigFormProps = {
    selectedComponent: ComponentModel;
};

export const FieldConfigForm = ({ selectedComponent }: FieldConfigFormProps) => {
    const componentConfig = getComponentConfig(selectedComponent.name);
    if(!isDefined(componentConfig)) return null;

    const fields = Object.entries(componentConfig.fields);
    const defaultProps = componentConfig.defaultProps;

    return (
        <>
            {fields.map(([
                fieldName,
                fieldConfig
            ], index) => {
                const type = fieldConfig.type;

                return (
                    <Fragment key={`${selectedComponent.id}-${fieldName}`}>
                        <FieldConfigFormComponent
                            component={selectedComponent}
                            defaultProps={defaultProps}
                            fieldConfig={fieldConfig}
                            fieldName={fieldName}
                            type={type}
                        />
                        {index < fields.length - 1 && (
                            <div className={styles["field-config-form__separator"]} />
                        )}
                    </Fragment>
                );
            })}
        </>
    );
};
