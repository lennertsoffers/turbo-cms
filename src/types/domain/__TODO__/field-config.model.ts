import { ComposedFieldConfig as ComposedFieldConfigValue } from "./composed-field-config.model";
import { FieldType } from "./enums/field-type.enum";

export type FieldOptionConfig = {
    label: string;
    value: boolean | number | string;
};

export type BaseFieldConfig = {
    label: string;
};

export type TextFieldConfig = {
    type: typeof FieldType.TEXT;
} & BaseFieldConfig;

export type NumberFieldConfig = {
    type: typeof FieldType.NUMBER;
    min?: number;
    max?: number;
} & BaseFieldConfig;

export type TextareaFieldConfig = {
    type: typeof FieldType.TEXTAREA;
} & BaseFieldConfig;

export type SelectFieldConfig = {
    type: typeof FieldType.SELECT;
    options: FieldOptionConfig[];
} & BaseFieldConfig;

export type RadioFieldConfig = {
    type: typeof FieldType.RADIO;
    options: FieldOptionConfig[];
} & BaseFieldConfig;

export type ColorFieldConfig = {
    type: typeof FieldType.COLOR;
} & BaseFieldConfig;

export type ComposedFieldConfig = {
    type: typeof FieldType.COMPOSED;
} & BaseFieldConfig & ComposedFieldConfigValue;

export type FieldTypeToFieldConfigModel = {
    [FieldType.NUMBER]: NumberFieldConfig;
    [FieldType.TEXT]: TextFieldConfig;
    [FieldType.TEXTAREA]: TextareaFieldConfig;
    [FieldType.SELECT]: SelectFieldConfig;
    [FieldType.RADIO]: RadioFieldConfig;
    [FieldType.COLOR]: ColorFieldConfig;
    [FieldType.COMPOSED]: ComposedFieldConfig;
};

export type FieldConfigModel = (
  | ColorFieldConfig
  | ComposedFieldConfig
  | NumberFieldConfig
  | RadioFieldConfig
  | SelectFieldConfig
  | TextareaFieldConfig
  | TextFieldConfig
);
