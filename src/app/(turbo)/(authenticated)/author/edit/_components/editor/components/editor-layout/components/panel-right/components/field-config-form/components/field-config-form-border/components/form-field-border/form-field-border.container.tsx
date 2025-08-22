"use client";

import { IconComponent } from "@turbo-cms/types-components/components/icon";

import { FormFieldBorderComponent } from "./form-field-border.component";

type FormFieldBorderProps = {
    Icon: IconComponent;
    BorderStyleOptions: JSX.Element[];
};

export const FormFieldBorder = ({
    Icon,
    BorderStyleOptions
}: FormFieldBorderProps) => {
    return (
        <FormFieldBorderComponent
            BorderStyleOptions={BorderStyleOptions}
            Icon={Icon}
        />
    );
};
