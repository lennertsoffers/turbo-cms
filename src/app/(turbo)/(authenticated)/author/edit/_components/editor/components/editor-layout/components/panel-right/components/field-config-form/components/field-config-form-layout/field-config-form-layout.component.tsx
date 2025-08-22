"use client";

import {
    ArrowDown02Icon,
    ArrowRight02Icon,
    ParagraphSpacingIcon
} from "hugeicons-react";

import { FormFieldAlignment } from "@turbo-cms/components-editor/client/form/form-field-alignment";
import { FormIconLabelField } from "@turbo-cms/components-general/client/form/form-icon-label-field";
import { FormLabelFieldRadioToggle } from "@turbo-cms/components-general/client/form/form-label-field-radio-toggle";
import { DefaultProps } from "@turbo-cms/core/types/config/components/component-config.model";
import { ComponentModel } from "@turbo-cms/core/types/config/components/component.model";
import { LayoutComposedFieldConfig } from "@turbo-cms/core/types/config/components/composed-field-config.model";

import { FieldConfigFormLabel } from "../../../field-config-form-label/field-config-form-label.container";
import { FieldConfigFormSpacer } from "../../../field-config-form-spacer/field-config-form-spacer.container";
import { FieldConfigFormResizing } from "../field-config-form-resizing/field-config-form-resizing.container";
import { FieldConfigFormSpacing } from "../field-config-form-spacing/field-config-form-spacing.container";

import styles from "./field-config-form-layout.module.scss";

type FieldConfigFormLayoutComonentProps = {
    component: ComponentModel;
    defaultProps: DefaultProps;
    fieldConfig: LayoutComposedFieldConfig;
    fieldName: string;
};

export const FieldConfigFormLayoutComonent = ({
    component,
    defaultProps,
    fieldConfig,
    fieldName
}: FieldConfigFormLayoutComonentProps) => {
    return (
        <div>
            <FieldConfigFormLabel
                fieldName={fieldName}
                section={true}
            />
            <div className={styles["field-config-form-layout"]}>
                <FieldConfigFormResizing
                    component={component}
                    defaultProps={defaultProps}
                    fieldConfig={fieldConfig.resizing}
                    fieldName={fieldName}
                />
                <div className={styles["field-config-form-layout__alignment"]}>
                    <div className={styles["field-config-form-layout__alignment--left"]}>
                        <div className={styles["field-config-form-layout__alignment__direction"]}>
                            <FormLabelFieldRadioToggle
                                options={[
                                    {
                                        value: "horizontal",
                                        Icon: ArrowRight02Icon,
                                        defaultChecked: true
                                    },
                                    {
                                        value: "vertical",
                                        Icon: ArrowDown02Icon
                                    }
                                ]}
                                label={"direction"}
                                name={"direction"}
                            />
                        </div>
                        <FormIconLabelField
                            Icon={ParagraphSpacingIcon}
                            label={"gap"}
                            tooltip={"gap between objects"}
                            type={"number"}
                        />
                    </div>
                    <div className={styles["field-config-form-layout__alignment--right"]}>
                        <FieldConfigFormLabel fieldName={"alignment"} />
                        <FormFieldAlignment
                            className={styles["field-config-form-layout__alignment--right"]}
                            onSelect={() => {}}
                        />
                    </div>
                    <FieldConfigFormSpacer />
                </div>
                <FieldConfigFormSpacing
                    component={component}
                    defaultProps={defaultProps}
                    fieldConfig={fieldConfig.spacing}
                    fieldName={fieldName}
                />
            </div>
        </div>
    );
};
