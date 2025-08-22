"use client";

import { useRef } from "react";

import { TextFieldConfig } from "@turbo-cms/core/types/config/components/field-config.model";
import {
    AuthorSelectors,
    useAuthorStore,
    useAuthorStoreContext
} from "@turbo-cms/store/author";
import { VariableType } from "@turbo-cms/types-models/author/variable-type.enum";
import { isDefined } from "@turbo-cms/utils-general/object";

import {
    updatePropWithValue,
    updatePropWithVariable
} from "../../../../../../../../helpers/component.helpers";
import { useProp } from "../../../../../../../../hooks/use-prop.hook";
import { VariableInputChangeValueHandler } from "../../../variable-input-field/variable-input-field.container";
import { FieldConfigFormProps } from "../../field-config-form.types";

import { FieldConfigFormTextComponent } from "./field-config-form-text.component";

type FieldConfigFormTextProps = FieldConfigFormProps<TextFieldConfig>;

export const FieldConfigFormText = ({
    component,
    fieldName,
    fieldConfig,
    defaultProps
}: FieldConfigFormTextProps) => {
    const { r } = useProp();

    const inputRef = useRef<HTMLInputElement | null>(null);

    const { getState } = useAuthorStoreContext();
    const setComponent = useAuthorStore(AuthorSelectors.setComponent);

    const handleOnVariableInputChange: VariableInputChangeValueHandler<
            typeof VariableType.TEXT
    > = (
            value
        ) => {
        const rootComponent = AuthorSelectors.getComponent(getState());

        if(!isDefined(rootComponent)) return;

        const newComponent = value.inputType === "value"
            ? updatePropWithValue(
                rootComponent,
                component.id
            )(
                fieldName,
                value.values["text-value"]
            )
            : updatePropWithVariable(
                rootComponent,
                component.id
            )(
                fieldName,
                value.variable.id
            );

        setComponent(newComponent);
    };

    return (
        <FieldConfigFormTextComponent
            defaultValue={r(
                component.props[fieldName],
                defaultProps[fieldName]
            )}
            label={fieldConfig.label}
            ref={inputRef}
            onVariableInputChange={handleOnVariableInputChange}
        />
    );
};
