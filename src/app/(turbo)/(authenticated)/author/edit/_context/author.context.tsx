"use client";

import {
    createContext,
    PropsWithChildren,
    useContext
} from "react";

import { ComponentMapConfigModel } from "@turbo-cms/core/types/config/components/component-config.model";
import { AuthorStoreProvider } from "@turbo-cms/store/author";
import { isDefined } from "@turbo-cms/utils-general/object";

type AuthorContextValue = {
    componentMapConfig: ComponentMapConfigModel<Record<string, any>>;
};

type AuthorContextProviderProps = PropsWithChildren<{
    componentMapConfig: ComponentMapConfigModel<Record<string, any>>;
}>;

const AuthorContext = createContext<AuthorContextValue>({
    componentMapConfig: {}
});

export const AuthorContextProvider = ({
    componentMapConfig,
    children
}: AuthorContextProviderProps) => (
    <AuthorStoreProvider>
        <AuthorContext.Provider
            value={{
                componentMapConfig: componentMapConfig
            }}
        >
            {children}
        </AuthorContext.Provider>
    </AuthorStoreProvider>
);

export const useAuthorContext = () => {
    const context = useContext(AuthorContext);

    if(!isDefined(context)) {
        throw new Error(
            "useAuthorContext can only be used inside an AuthorContext"
        );
    }

    return context;
};
