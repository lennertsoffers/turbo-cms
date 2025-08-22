import { useQuery } from "@tanstack/react-query";
import {
    createContext,
    PropsWithChildren,
    useContext
} from "react";

import { Variable } from "@turbo-cms/config/payload/payload.types";
import { isDefined } from "@turbo-cms/utils-general/object";

import { getVariables } from "../queries/variable.queries";

export type EditorContextValue = {
    variables: Variable[];
};

const EditorContext = createContext<EditorContextValue | undefined>(
    undefined
);

export const EditorContextProvider = ({ children }: PropsWithChildren) => {
    const { data } = useQuery({
        queryKey: [ "variables" ],
        queryFn: getVariables
    });

    return (
        <EditorContext.Provider value={{
            variables: data ?? []
        }}
        >
            {children}
        </EditorContext.Provider>
    );
};

export const useEditorContext = () => {
    const context = useContext(EditorContext);

    if(!isDefined(context)) {
        throw new Error(
            "useEditorContext can only be used inside a EditorContext"
        );
    }

    return context;
};
