import {
    VariableType,
    VariableTypeEnum
} from "./variable-type.enum";

type BaseVariable = {
    id: string;
    name: string;
    updatedAt: string;
    createdAt: string;
};

export type TextVariable = {
    "type": typeof VariableType.TEXT;
    "text-value": string;
} & BaseVariable;

export type ColorVariable = {
    "type": typeof VariableType.COLOR;
    "color-value": string;
} & BaseVariable;

export type NumberVariable = {
    "type": typeof VariableType.NUMBER;
    "number-value": number;
} & BaseVariable;

export type VariableTypeToVariableMap = {
    [VariableType.TEXT]: TextVariable;
    [VariableType.COLOR]: ColorVariable;
    [VariableType.NUMBER]: NumberVariable;
};

export type Variable<TVariableType extends VariableTypeEnum> = VariableTypeToVariableMap[
    TVariableType
];
