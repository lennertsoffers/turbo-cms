import { ComposedFieldType } from "./enums/composed-field-type.enum";
import {
    ColorFieldConfig,
    NumberFieldConfig,
    RadioFieldConfig,
    TextFieldConfig
} from "./field-config.model";

export type BorderComposedFieldConfig = {
    composedType: typeof ComposedFieldType.BORDER;
    borderTopWidth: NumberFieldConfig;
    borderTopStyle: RadioFieldConfig;
    borderTopColor: ColorFieldConfig;
    borderBottomWidth: NumberFieldConfig;
    borderBottomStyle: RadioFieldConfig;
    borderBottomColor: ColorFieldConfig;
    borderLeftWidth: NumberFieldConfig;
    borderLeftStyle: RadioFieldConfig;
    borderLeftColor: ColorFieldConfig;
    borderRightWidth: NumberFieldConfig;
    borderRightStyle: RadioFieldConfig;
    borderRightColor: ColorFieldConfig;
};

export type CornerRadiusComposedFieldConfig = {
    composedType: typeof ComposedFieldType.CORNER_RADIUS;
    cornerAllRadius: TextFieldConfig;
    cornerTopLeftRadius: TextFieldConfig;
    cornerTopRightRadius: TextFieldConfig;
    cornerBottomLeftRadius: TextFieldConfig;
    cornerBottomRightRadius: TextFieldConfig;
};

export type AppearanceComposedFieldConfig = {
    composedType: typeof ComposedFieldType.APPEARANCE;
    opacity: NumberFieldConfig;
    cornerRadius: CornerRadiusComposedFieldConfig;
    backgroundColor: ColorFieldConfig;
    textColor: ColorFieldConfig;
    border: BorderComposedFieldConfig;
};

export type SpacingComposedFieldConfig = {
    composedType: typeof ComposedFieldType.SPACING;
    paddingTop: NumberFieldConfig;
    paddingBottom: NumberFieldConfig;
    paddingLeft: NumberFieldConfig;
    paddingRight: NumberFieldConfig;
};

export type ResizingComposedFieldConfig = {
    composedType: typeof ComposedFieldType.RESIZING;
    horizontal: RadioFieldConfig;
    vertical: RadioFieldConfig;
};

export type LayoutComposedFieldConfig = {
    composedType: typeof ComposedFieldType.LAYOUT;
    resizing: ResizingComposedFieldConfig;
    direction: RadioFieldConfig;
    gap: NumberFieldConfig;
    alignment: RadioFieldConfig;
    spacing: SpacingComposedFieldConfig;
};

export type ComposedFieldTypeToComposedFieldConfigModel = {
    [ComposedFieldType.APPEARANCE]: AppearanceComposedFieldConfig;
    [ComposedFieldType.BORDER]: BorderComposedFieldConfig;
    [ComposedFieldType.CORNER_RADIUS]: CornerRadiusComposedFieldConfig;
    [ComposedFieldType.LAYOUT]: LayoutComposedFieldConfig;
    [ComposedFieldType.RESIZING]: ResizingComposedFieldConfig;
    [ComposedFieldType.SPACING]: SpacingComposedFieldConfig;
};

export type ComposedFieldConfig =
  | AppearanceComposedFieldConfig
  | BorderComposedFieldConfig
  | CornerRadiusComposedFieldConfig
  | LayoutComposedFieldConfig
  | ResizingComposedFieldConfig
  | SpacingComposedFieldConfig;
