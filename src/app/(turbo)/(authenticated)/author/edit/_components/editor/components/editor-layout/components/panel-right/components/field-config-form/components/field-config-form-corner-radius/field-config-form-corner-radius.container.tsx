"use client";

import {
    useRef,
    useState
} from "react";

import { CornerRadiusComposedFieldConfig } from "@turbo-cms/core/types/config/components/composed-field-config.model";
import {
    AuthorSelectors,
    useAuthorStore,
    useAuthorStoreContext
} from "@turbo-cms/store/author";
import { VariableType } from "@turbo-cms/types-models/author/variable-type.enum";
import { isDefined } from "@turbo-cms/utils-general/object";

import {
    clearProps,
    updatePropWithValue,
    updatePropWithVariable
} from "../../../../../../../../helpers/component.helpers";
import { useProp } from "../../../../../../../../hooks/use-prop.hook";
import { VariableInputChangeValueHandler } from "../../../variable-input-field/variable-input-field.container";
import { ComposedFieldConfigFormProps } from "../../field-config-form.types";

import { FieldConfigFormCornerRadiusComponent } from "./field-config-form-corner-radius.component";

type FieldConfigFormCornerRadiusProps = ComposedFieldConfigFormProps<
    CornerRadiusComposedFieldConfig
>;

export const FieldConfigFormCornerRadius = ({
    component,
    defaultProps
}: FieldConfigFormCornerRadiusProps) => {
    const { r } = useProp();

    const allInputRef = useRef<HTMLInputElement | null>(null);
    const topLeftInputRef = useRef<HTMLInputElement | null>(null);
    const topRightInputRef = useRef<HTMLInputElement | null>(null);
    const bottomLeftInputRef = useRef<HTMLInputElement | null>(null);
    const bottomRightInputRef = useRef<HTMLInputElement | null>(null);

    const { getState } = useAuthorStoreContext();
    const setComponent = useAuthorStore(AuthorSelectors.setComponent);

    const createHandleOnVariableInputChange: (field: string) => VariableInputChangeValueHandler<
        typeof VariableType.TEXT
    > =
        (field) =>
        (value) => {
            const rootComponent = AuthorSelectors.getComponent(getState());

            if(!isDefined(rootComponent)) return;

            const newComponent = value.inputType === "value"
                ? updatePropWithValue(
                    rootComponent,
                    component.id
                )(
                    field,
                    value.values["text-value"]
                )
                : updatePropWithVariable(
                    rootComponent,
                    component.id
                )(
                    field,
                    value.variable.id
                );

            const cleanedComponent = field === "cornerAllRadius"
                ? clearProps(
                    newComponent,
                    component.id
                )([
                    "cornerTopLeftRadius",
                    "cornerTopRightRadius",
                    "cornerBottomLeftRadius",
                    "cornerBottomRightRadius"
                ])
                : clearProps(
                    newComponent,
                    component.id
                )([ "cornerAllRadius" ]);

            setComponent(cleanedComponent);
        };

    const [
        individualCorners,
        setIndividualCorners
    ] = useState<boolean>(false);

    const handleOnToggleMore = (more: boolean) => setIndividualCorners(more);

    return (
        <FieldConfigFormCornerRadiusComponent
            allInputRef={allInputRef}
            bottomLeftInputRef={bottomLeftInputRef}
            bottomRightInputRef={bottomRightInputRef}
            createHandleOnVariableInputChange={createHandleOnVariableInputChange}
            defaultProps={defaultProps}
            individualCorners={individualCorners}
            topLeftInputRef={topLeftInputRef}
            topRightInputRef={topRightInputRef}
            onToggleMore={handleOnToggleMore}
        />
    );
};
