"use client";

import { RadioFieldConfig } from "@turbo-cms/core/types/config/components/field-config.model";

import { FieldConfigFormProps } from "../../field-config-form.types";

import { FieldConfigFormRadioComponent } from "./field-config-form-radio.component";

type FieldConfigFormRadioProps = FieldConfigFormProps<RadioFieldConfig>;

export const FieldConfigFormRadio = ({
    component,
    fieldName,
    fieldConfig,
    defaultProps
}: FieldConfigFormRadioProps) => {
    return <FieldConfigFormRadioComponent />;
};
