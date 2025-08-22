import { Variable } from "@turbo-cms/config/payload/payload.types";
import {
    VariableType,
    VariableTypeEnum
} from "@turbo-cms/types-models/author/variable-type.enum";

export const VariableTypeToDefaultVariableMap: Record<VariableTypeEnum, Partial<Variable>> = {
    [VariableType.TEXT]: {
        "text-value": ""
    },
    [VariableType.NUMBER]: {
        "number-value": 0
    },
    [VariableType.COLOR]: {
        "color-value": "#fff"
    }
};
