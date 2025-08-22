import { Prop } from "@turbo-cms/core/types/config/components/component-config.model";
import { isDefined } from "@turbo-cms/utils-general/object";

import { useEditorContext } from "../context/editor.context";

export const useProp = () => {
    const { variables } = useEditorContext();

    const readValue =
        <TType>(prop: Prop<TType> | undefined, fallback: TType) => {
            if(!prop) return fallback;

            if(prop.type === "value") {
                return prop.value;
            }

            const variable = variables.find(({ id }) => id === prop.id);
            if(!isDefined(variable)) return fallback;

            if(variable.type === "TEXT") {
                return variable["text-value"] as TType;
            } else if(variable.type === "NUMBER") {
                return variable["number-value"] as TType;
            } else if(variable.type === "COLOR") {
                return variable["color-value"] as TType;
            }

            return fallback;
        };

    return {
        r: readValue
    };
};
