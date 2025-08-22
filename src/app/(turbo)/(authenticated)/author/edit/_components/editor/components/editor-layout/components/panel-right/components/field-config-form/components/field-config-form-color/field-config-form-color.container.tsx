"use client";

import { useRef } from "react";

import { ColorFieldConfig } from "@turbo-cms/core/types/config/components/field-config.model";
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

import { FieldConfigFormColorComponent } from "./field-config-form-color.component";

type FieldConfigFormColorProps = FieldConfigFormProps<ColorFieldConfig>;

export const FieldConfigFormColor = ({
    component,
    fieldName,
    fieldConfig,
    defaultProps
}: FieldConfigFormColorProps) => {
    const { r } = useProp();

    const inputRef = useRef<HTMLInputElement | null>(null);

    const { getState } = useAuthorStoreContext();
    const setComponent = useAuthorStore(AuthorSelectors.setComponent);

    const handleOnVariableInputChange: VariableInputChangeValueHandler<
        typeof VariableType.COLOR
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
                value.values["color-value"]
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
        <FieldConfigFormColorComponent
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
