"use client";

import { DefaultProps } from "@turbo-cms/core/types/config/components/component-config.model";
import { ComponentModel } from "@turbo-cms/core/types/config/components/component.model";
import {
    FieldType,
    FieldTypeEnum
} from "@turbo-cms/core/types/config/components/enums/field-type.enum";
import { FieldTypeToFieldConfigModel } from "@turbo-cms/core/types/config/components/field-config.model";

import { FieldConfigFormComposed } from "./components/field-config-form-composed/field-config-form-composed.container";
import { FieldTypeToComponentMap } from "./field-config-form.config";

type FieldConfigFormComponentProps<TFieldType extends FieldTypeEnum> = {
    fieldName: string;
    type: TFieldType;
    fieldConfig: FieldTypeToFieldConfigModel[TFieldType];
    defaultProps: DefaultProps;
    component: ComponentModel;
};

export const FieldConfigFormComponent = <TFieldType extends FieldTypeEnum>({
    fieldName,
    type,
    fieldConfig,
    defaultProps,
    component
}: FieldConfigFormComponentProps<TFieldType>) => {
    if(type === FieldType.COMPOSED && fieldConfig.type === FieldType.COMPOSED) {
        return (
            <FieldConfigFormComposed
                component={component}
                composedFieldType={fieldConfig.composedType}
                defaultProps={defaultProps}
                fieldConfig={fieldConfig}
                fieldName={fieldName}
            />

        );
    }

    const FieldComponent = FieldTypeToComponentMap[type];

    return FieldComponent({
        component: component,
        defaultProps: defaultProps,
        fieldConfig: fieldConfig,
        fieldName: fieldName
    });
};
