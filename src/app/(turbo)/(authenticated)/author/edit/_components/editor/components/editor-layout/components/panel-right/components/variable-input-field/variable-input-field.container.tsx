"use client";

import {
    ComponentProps,
    useRef,
    useState
} from "react";

import { IconComponent } from "@turbo-cms/types-components/components/icon";
import { VariableTypeEnum } from "@turbo-cms/types-models/author/variable-type.enum";
import {
    Variable,
    VariableTypeToVariableMap
} from "@turbo-cms/types-models/author/variable.types";
import { Id } from "@turbo-cms/types-models/id.types";
import { isDefined } from "@turbo-cms/utils-general/object";

import { useEditorContext } from "../../../../../../context/editor.context";

import { VariableInputFieldComponent } from "./variable-input-field.component";

export type VariableInputChangeValueHandler<TVariableType extends VariableTypeEnum> = (value: {
    inputType: "value";
    values: Omit<VariableTypeToVariableMap[TVariableType], "createdAt" | "id" | "name" | "updatedAt">;
} | {
    inputType: "variable";
    variable: Variable<TVariableType>;
}) => void;

type VariableInputFieldProps<TVariableType extends VariableTypeEnum> = {
    label?: string;
    variableType: TVariableType;
    className?: string;
    inputClassName?: string;
    tooltip?: string;
    onVariableInputChange: VariableInputChangeValueHandler<TVariableType>;
    Icon?: IconComponent;
} & ComponentProps<"input">;

export const VariableInputField = <TVariableType extends VariableTypeEnum>({
    label,
    variableType,
    className,
    inputClassName,
    tooltip,
    onVariableInputChange,
    Icon,
    ...inputProps
}: VariableInputFieldProps<TVariableType>) => {
    const { variables: allVariables } = useEditorContext();
    const variables = allVariables
        .filter((variable) => variable.type === variableType) as Variable<TVariableType>[];

    const queryInputRef = useRef<HTMLInputElement>(null);

    const [
        query,
        setQuery
    ] = useState<string | undefined>(undefined);

    const [
        selectedVariable,
        setSelectedVariable
    ] = useState<Variable<TVariableType> | undefined>(undefined);

    const [
        activeVariableId,
        setActiveVariableId
    ] = useState<Id | undefined>(undefined);

    const filteredVariables = variables
        .filter(({ name }) => !query || name.includes(query))
        .slice(
            0,
            5
        );

    const setSelectedVariableId = (id: Id | undefined) => {
        const selectedVariable = variables.find((variable) => variable.id === id);
        if(!isDefined(selectedVariable)) {
            setSelectedVariable(selectedVariable);

            return;
        }

        setSelectedVariable(selectedVariable);

        onVariableInputChange({
            inputType: "variable",
            variable: selectedVariable
        });
    };

    const handleOnQueryInputChange = () => setQuery(queryInputRef.current?.value);

    const handleOnVariableInputChange = onVariableInputChange;

    return (
        <VariableInputFieldComponent
            {...inputProps}
            Icon={Icon}
            activeVariableId={activeVariableId}
            className={className}
            inputClassName={inputClassName}
            label={label}
            queryInputRef={queryInputRef}
            selectedVariable={selectedVariable}
            setActiveVariableId={setActiveVariableId}
            setSelectedVariableId={setSelectedVariableId}
            tooltip={tooltip}
            variableType={variableType}
            variables={filteredVariables}
            onChangeValue={handleOnVariableInputChange as Parameters<typeof VariableInputFieldComponent>[0]["onChangeValue"]}
            onQueryInputChange={handleOnQueryInputChange}
        />
    );
};
