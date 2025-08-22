"use client";

import { AppearanceComposedFieldConfig } from "@turbo-cms/core/types/config/components/composed-field-config.model";

import { ComposedFieldConfigFormProps } from "../../field-config-form.types";

import { FieldConfigFormAppearanceComponent } from "./field-config-form-appearance.component";

type FieldConfigFormAppearanceProps = ComposedFieldConfigFormProps<AppearanceComposedFieldConfig>;

export const FieldConfigFormAppearance = ({
    component,
    defaultProps,
    fieldConfig,
    fieldName
}: FieldConfigFormAppearanceProps) => {
    return (
        <FieldConfigFormAppearanceComponent
            component={component}
            defaultProps={defaultProps}
            fieldConfig={fieldConfig}
            fieldName={fieldName}
        />
    );
};
