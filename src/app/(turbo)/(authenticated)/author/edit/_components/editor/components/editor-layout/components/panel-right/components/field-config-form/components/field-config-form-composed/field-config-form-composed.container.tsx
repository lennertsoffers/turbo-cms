"use client";

import { DefaultProps } from "@turbo-cms/core/types/config/components/component-config.model";
import { ComponentModel } from "@turbo-cms/core/types/config/components/component.model";
import { ComposedFieldTypeToComposedFieldConfigModel } from "@turbo-cms/core/types/config/components/composed-field-config.model";
import { ComposedFieldTypeEnum } from "@turbo-cms/core/types/config/components/enums/composed-field-type.enum";
import { isDefined } from "@turbo-cms/utils-general/object";

import { ComposedFieldTypeToComponentMap } from "../../composed-field-config-form.config";

type FieldConfigFormComposedProps<TComposedFieldType extends ComposedFieldTypeEnum> = {
    component: ComponentModel;
    fieldName: string;
    composedFieldType: TComposedFieldType;
    fieldConfig: ComposedFieldTypeToComposedFieldConfigModel[TComposedFieldType];
    defaultProps: DefaultProps;
};

export const FieldConfigFormComposed = <TComposedFieldType extends ComposedFieldTypeEnum>({
    fieldName,
    composedFieldType,
    fieldConfig,
    component,
    defaultProps
}: FieldConfigFormComposedProps<TComposedFieldType>) => {
    if(!isDefined(composedFieldType)) return;
    const ComposedFieldComponent = ComposedFieldTypeToComponentMap[composedFieldType];

    return ComposedFieldComponent({
        component: component,
        defaultProps: defaultProps,
        fieldConfig: fieldConfig,
        fieldName: fieldName
    });
};
