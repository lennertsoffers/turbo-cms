"use client";

import { useRef } from "react";

import { LayoutComposedFieldConfig } from "@turbo-cms/core/types/config/components/composed-field-config.model";
import {
    AuthorSelectors,
    useAuthorStore,
    useAuthorStoreContext
} from "@turbo-cms/store/author";
import { isDefined } from "@turbo-cms/utils-general/object";

import { updatePropWithValue } from "../../../../../../../../helpers/component.helpers";
import { ComposedFieldConfigFormProps } from "../../field-config-form.types";

import { FieldConfigFormLayoutComonent } from "./field-config-form-layout.component";

type FieldConfigFormLayoutProps = ComposedFieldConfigFormProps<LayoutComposedFieldConfig>;

export const FieldConfigFormLayout = ({
    fieldName,
    fieldConfig,
    component,
    defaultProps
}: FieldConfigFormLayoutProps) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const { getState } = useAuthorStoreContext();
    const setComponent = useAuthorStore(AuthorSelectors.setComponent);

    const handleOnChange = () => {
        const rootComponent = AuthorSelectors.getComponent(getState());

        if(!isDefined(rootComponent)) return;
        if(!isDefined(inputRef.current)) return;

        const newComponent = updatePropWithValue(
            rootComponent,
            component.id
        )(
            fieldName,
            inputRef.current.value
        );

        setComponent(newComponent);
    };

    return (
        <FieldConfigFormLayoutComonent
            component={component}
            defaultProps={defaultProps}
            fieldConfig={fieldConfig}
            fieldName={fieldName}
        />
    );
};
