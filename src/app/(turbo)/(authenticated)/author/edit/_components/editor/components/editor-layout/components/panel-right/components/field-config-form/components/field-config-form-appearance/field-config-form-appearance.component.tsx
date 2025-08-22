"use client";

import { DefaultProps } from "@turbo-cms/core/types/config/components/component-config.model";
import { ComponentModel } from "@turbo-cms/core/types/config/components/component.model";
import { AppearanceComposedFieldConfig } from "@turbo-cms/core/types/config/components/composed-field-config.model";

import { FieldConfigFormLabel } from "../../../field-config-form-label/field-config-form-label.container";
import { FieldConfigFormBorder } from "../field-config-form-border/field-config-form-border.container";
import { FieldConfigFormColor } from "../field-config-form-color/field-config-form-color.container";
import { FieldConfigFormCornerRadius } from "../field-config-form-corner-radius/field-config-form-corner-radius.container";
import { FieldConfigFormNumber } from "../field-config-form-number/field-config-form-number.container";

import styles from "./field-config-form-appearance.module.scss";

type FieldConfigFormAppearanceComponentProps = {
    component: ComponentModel;
    defaultProps: DefaultProps;
    fieldConfig: AppearanceComposedFieldConfig;
    fieldName: string;
};

export const FieldConfigFormAppearanceComponent = ({
    component,
    defaultProps,
    fieldConfig,
    fieldName
}: FieldConfigFormAppearanceComponentProps) => {
    return (
        <div>
            <FieldConfigFormLabel
                fieldName={fieldName}
                section={true}
            />
            <div className={styles["field-config-form-appearance"]}>
                <FieldConfigFormNumber
                    component={component}
                    defaultProps={defaultProps}
                    fieldConfig={fieldConfig.opacity}
                    fieldName={"opacity"}
                />
                <FieldConfigFormColor
                    component={component}
                    defaultProps={defaultProps}
                    fieldConfig={fieldConfig.backgroundColor}
                    fieldName={"backgroundColor"}
                />
                <FieldConfigFormColor
                    component={component}
                    defaultProps={defaultProps}
                    fieldConfig={fieldConfig.textColor}
                    fieldName={"textColor"}
                />
                <FieldConfigFormCornerRadius
                    component={component}
                    defaultProps={defaultProps}
                    fieldConfig={fieldConfig.cornerRadius}
                    fieldName={"cornerRadius"}
                />
                <FieldConfigFormBorder
                    component={component}
                    defaultProps={defaultProps}
                    fieldConfig={fieldConfig.border}
                    fieldName={"border"}
                />
            </div>
        </div>
    );
};
