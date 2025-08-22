import { Variable } from "@turbo-cms/config/payload/payload.types";
import { VariableType } from "@turbo-cms/types-models/author/variable-type.enum";
import {
    ColorVariable,
    NumberVariable,
    SizeVariable,
    TextVariable
} from "@turbo-cms/types-models/author/variable.types";

type IsTextVariable = (variable: Variable) => variable is TextVariable;
export const isTextVariable: IsTextVariable = (
    variable: Variable
): variable is TextVariable => variable.type === VariableType.TEXT;

type IsColorVariable = (variable: Variable) => variable is ColorVariable;
export const isColorVariable: IsColorVariable = (
    variable: Variable
): variable is ColorVariable => variable.type === VariableType.COLOR;

type IsSizeVariable = (variable: Variable) => variable is SizeVariable;
export const isSizeVariable: IsSizeVariable = (
    variable: Variable
): variable is SizeVariable => variable.type === VariableType.SIZE;

type IsNumberVariable = (variable: Variable) => variable is NumberVariable;
export const isNumberVariable: IsNumberVariable = (
    variable: Variable
): variable is NumberVariable => variable.type === VariableType.NUMBER;
