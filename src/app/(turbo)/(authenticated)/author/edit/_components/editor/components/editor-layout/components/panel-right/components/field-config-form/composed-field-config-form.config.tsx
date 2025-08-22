import { FC } from "react";

import { ComposedFieldTypeToComposedFieldConfigModel } from "@turbo-cms/core/types/config/components/composed-field-config.model";
import {
    ComposedFieldType,
    ComposedFieldTypeEnum
} from "@turbo-cms/core/types/config/components/enums/composed-field-type.enum";

import { FieldConfigFormAppearance } from "./components/field-config-form-appearance/field-config-form-appearance.container";
import { FieldConfigFormBorder } from "./components/field-config-form-border/field-config-form-border.container";
import { FieldConfigFormCornerRadius } from "./components/field-config-form-corner-radius/field-config-form-corner-radius.container";
import { FieldConfigFormLayout } from "./components/field-config-form-layout/field-config-form-layout.container";
import { FieldConfigFormResizing } from "./components/field-config-form-resizing/field-config-form-resizing.container";
import { FieldConfigFormSpacing } from "./components/field-config-form-spacing/field-config-form-spacing.container";
import { ComposedFieldConfigFormProps } from "./field-config-form.types";

export const ComposedFieldTypeToComponentMap: {
    [TComposedFieldtype in ComposedFieldTypeEnum]: FC<
        ComposedFieldConfigFormProps<
            ComposedFieldTypeToComposedFieldConfigModel[TComposedFieldtype]
        >
    >;
} = {
    [ComposedFieldType.APPEARANCE]: FieldConfigFormAppearance,
    [ComposedFieldType.BORDER]: FieldConfigFormBorder,
    [ComposedFieldType.CORNER_RADIUS]: FieldConfigFormCornerRadius,
    [ComposedFieldType.LAYOUT]: FieldConfigFormLayout,
    [ComposedFieldType.RESIZING]: FieldConfigFormResizing,
    [ComposedFieldType.SPACING]: FieldConfigFormSpacing
};
