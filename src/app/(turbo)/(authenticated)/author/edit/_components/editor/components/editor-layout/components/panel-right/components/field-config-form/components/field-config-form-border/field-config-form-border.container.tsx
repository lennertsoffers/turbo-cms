"use client";

import { useState } from "react";

import { BorderComposedFieldConfig } from "@turbo-cms/core/types/config/components/composed-field-config.model";

import { ComposedFieldConfigFormProps } from "../../field-config-form.types";

import { FieldConfigFormBorderComponent } from "./field-config-form-border.component";

type FieldConfigFormBorderProps = ComposedFieldConfigFormProps<BorderComposedFieldConfig>;

export const FieldConfigFormBorder = ({
    component,
    defaultProps,
    fieldName,
    fieldConfig
}: FieldConfigFormBorderProps) => {
    const [
        individualBorders,
        setIndividualBorders
    ] = useState<boolean>(false);

    const handleOnToggleMore = (more: boolean) => setIndividualBorders(more);

    return (
        <FieldConfigFormBorderComponent
            fieldConfig={fieldConfig}
            individualBorders={individualBorders}
            onToggleMore={handleOnToggleMore}
        />
    );
};
