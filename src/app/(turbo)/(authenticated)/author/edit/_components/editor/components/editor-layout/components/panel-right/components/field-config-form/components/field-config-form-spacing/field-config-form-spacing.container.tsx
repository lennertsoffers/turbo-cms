"use client";

import {
    useRef,
    useState
} from "react";

import { SpacingComposedFieldConfig } from "@turbo-cms/core/types/config/components/composed-field-config.model";
import {
    AuthorSelectors,
    useAuthorStore,
    useAuthorStoreContext
} from "@turbo-cms/store/author";
import { isDefined } from "@turbo-cms/utils-general/object";

import { updatePropWithValue } from "../../../../../../../../helpers/component.helpers";
import { ComposedFieldConfigFormProps } from "../../field-config-form.types";

import { FieldConfigFormSpacingComponent } from "./field-config-form-spacing.component";

type FieldConfigFormSpacingProps = ComposedFieldConfigFormProps<SpacingComposedFieldConfig>;

export const FieldConfigFormSpacing = ({
    fieldName,
    fieldConfig,
    component,
    defaultProps
}: FieldConfigFormSpacingProps) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const { getState } = useAuthorStoreContext();
    const setComponent = useAuthorStore(AuthorSelectors.setComponent);

    const [
        individualSpacing,
        setIndividualSpacing
    ] = useState<boolean>(false);

    const handleOnToggleMore = (more: boolean) => setIndividualSpacing(more);

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
        <FieldConfigFormSpacingComponent
            individualSpacing={individualSpacing}
            onToggleMore={handleOnToggleMore}
        />
    );
};
