"use client";

import { TextareaFieldConfig } from "@turbo-cms/core/types/config/components/field-config.model";

import { FieldConfigFormProps } from "../../field-config-form.types";

import { FieldConfigFormTextareaComponent } from "./field-config-form-textarea.component";

type FieldConfigFormTextareaProps = FieldConfigFormProps<TextareaFieldConfig>;

export const FieldConfigFormTextarea = ({
    component,
    fieldName,
    fieldConfig,
    defaultProps
}: FieldConfigFormTextareaProps) => {
    return <FieldConfigFormTextareaComponent />;
};
