"use client";

import { ResizingComposedFieldConfig } from "@turbo-cms/core/types/config/components/composed-field-config.model";

import { ComposedFieldConfigFormProps } from "../../field-config-form.types";

import { FieldConfigFormResizingComponent } from "./field-config-form-resizing.component";

type FieldConfigFormResizingProps = ComposedFieldConfigFormProps<ResizingComposedFieldConfig>;

export const FieldConfigFormResizing = ({
    fieldName,
    fieldConfig,
    component,
    defaultProps
}: FieldConfigFormResizingProps) => {
    return (
        <FieldConfigFormResizingComponent
            fieldConfig={fieldConfig}
        />
    );
};
