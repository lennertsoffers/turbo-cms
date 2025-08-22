
import { FC } from "react";

import {
    FieldType,
    FieldTypeEnum
} from "@turbo-cms/core/types/config/components/enums/field-type.enum";
import { FieldTypeToFieldConfigModel } from "@turbo-cms/core/types/config/components/field-config.model";

import { FieldConfigFormNumber } from "./components/field-config-form-number/field-config-form-number.container";
import { FieldConfigFormRadio } from "./components/field-config-form-radio/field-config-form-radio.container";
import { FieldConfigFormSelect } from "./components/field-config-form-select/field-config-form-select.container";
import { FieldConfigFormText } from "./components/field-config-form-text/field-config-form-text.container";
import { FieldConfigFormTextarea } from "./components/field-config-form-textarea/field-config-form-textarea.container";
import { FieldConfigFormProps } from "./field-config-form.types";

export const FieldTypeToComponentMap: {
    [TFieldtype in FieldTypeEnum]: FC<
        FieldConfigFormProps<FieldTypeToFieldConfigModel[TFieldtype]>
    >;
} = {
    [FieldType.NUMBER]: FieldConfigFormNumber,
    [FieldType.TEXT]: FieldConfigFormText,
    [FieldType.TEXTAREA]: FieldConfigFormTextarea,
    [FieldType.SELECT]: FieldConfigFormSelect,
    [FieldType.RADIO]: FieldConfigFormRadio,
    [FieldType.COMPOSED]: () => null
};
