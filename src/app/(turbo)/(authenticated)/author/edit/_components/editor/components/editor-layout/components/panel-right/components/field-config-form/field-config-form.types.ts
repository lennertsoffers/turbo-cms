import { ComponentModel } from "@turbo-cms/core/types/config/components/component.model";

export type FieldConfigFormProps<TFieldConfig> = {
    component: ComponentModel;
    fieldName: string;
    fieldConfig: TFieldConfig;
    defaultProps: Record<string, any>;
};

export type ComposedFieldConfigFormProps<TFieldConfig> = {
    component: ComponentModel;
    fieldName: string;
    fieldConfig: TFieldConfig;
    defaultProps: Record<string, any>;
};
