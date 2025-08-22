"use client";

import { useRef } from "react";

import { NumberFieldConfig } from "@turbo-cms/core/types/config/components/field-config.model";
import {
    AuthorSelectors,
    useAuthorStore,
    useAuthorStoreContext
} from "@turbo-cms/store/author";
import { IconComponent } from "@turbo-cms/types-components/components/icon";
import { VariableType } from "@turbo-cms/types-models/author/variable-type.enum";
import { isDefined } from "@turbo-cms/utils-general/object";

import {
    updatePropWithValue,
    updatePropWithVariable
} from "../../../../../../../../helpers/component.helpers";
import { useProp } from "../../../../../../../../hooks/use-prop.hook";
import { VariableInputChangeValueHandler } from "../../../variable-input-field/variable-input-field.container";
import { FieldConfigFormProps } from "../../field-config-form.types";

import { FieldConfigFormNumberComponent } from "./field-config-form-number.component";

type FieldConfigFormNumberProps = {
    Icon?: IconComponent;
} & FieldConfigFormProps<NumberFieldConfig>;

export const FieldConfigFormNumber = ({
    component,
    fieldName,
    fieldConfig,
    defaultProps,
    Icon
}: FieldConfigFormNumberProps) => {
    const { r } = useProp();

    const inputRef = useRef<HTMLInputElement | null>(null);

    const { getState } = useAuthorStoreContext();
    const setComponent = useAuthorStore(AuthorSelectors.setComponent);

    const handleOnVariableInputChange: VariableInputChangeValueHandler<
        typeof VariableType.NUMBER
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
                value.values["number-value"]
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
        <FieldConfigFormNumberComponent
            defaultValue={r(
                component.props[fieldName],
                defaultProps[fieldName]
            )}
            Icon={Icon}
            label={fieldConfig.label}
            ref={inputRef}
            onVariableInputChange={handleOnVariableInputChange}
        />
    );
};
