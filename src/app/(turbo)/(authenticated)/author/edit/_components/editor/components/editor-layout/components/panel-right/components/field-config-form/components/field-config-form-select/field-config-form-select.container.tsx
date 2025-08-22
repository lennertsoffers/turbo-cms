"use client";

import { SelectFieldConfig } from "@turbo-cms/core/types/config/components/field-config.model";

import { FieldConfigFormProps } from "../../field-config-form.types";

import { FieldConfigFormSelectComponent } from "./field-config-form-select.component";

type FieldConfigFormSelectProps = FieldConfigFormProps<SelectFieldConfig>;

export const FieldConfigFormSelect = ({
    component,
    fieldName,
    fieldConfig,
    defaultProps
}: FieldConfigFormSelectProps) => {
    return <FieldConfigFormSelectComponent />;
};
