"use client";

import { FieldConfigFormLabelComponent } from "./field-config-form-label.component";

type FieldConfigFormLabelProps = {
    fieldName: string;
    section?: boolean;
    title?: boolean;
};

export const FieldConfigFormLabel = ({
    fieldName,
    section,
    title
}: FieldConfigFormLabelProps) => {
    return (
        <FieldConfigFormLabelComponent
            fieldName={fieldName}
            section={section ?? false}
            title={title ?? false}
        />
    );
};
