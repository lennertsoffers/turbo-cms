"use client";

import {
    createContext,
    PropsWithChildren,
    useContext,
    useRef
} from "react";
import { useStore } from "zustand";

import { isDefined } from "@/utils/general/object.utils";

import { createAuthorStore } from "./author.store";
import { AuthorStore } from "./author.types";

type AuthorStoreApi = ReturnType<typeof createAuthorStore>;

type AuthorStoreContextValue = AuthorStoreApi | undefined;

type AuthorStoreProviderProps = PropsWithChildren<{}>;

export const AuthorStoreContext = createContext<AuthorStoreContextValue>(undefined);

export const AuthorStoreProvider = ({ children }: AuthorStoreProviderProps) => {
    const authorStoreApiRef = useRef<AuthorStoreApi>(undefined);

    if(!isDefined(authorStoreApiRef.current)) {
        authorStoreApiRef.current = createAuthorStore();
    }

    return (
        <AuthorStoreContext.Provider value={authorStoreApiRef.current}>
            {children}
        </AuthorStoreContext.Provider>
    );
};

export const useAuthorStoreContext = () => {
    const context = useContext(AuthorStoreContext);

    if(!isDefined(context)) {
        throw new Error("useAuthorStore can only be used inside a AuthorStoreContext");
    }

    return context;
};

export const useAuthorStore = <T,>(selector: (store: AuthorStore) => T): T => {
    const context = useContext(AuthorStoreContext);

    if(!isDefined(context)) {
        throw new Error("useAuthorStore can only be used inside a AuthorStoreContext");
    }

    return useStore(
        context,
        selector
    );
};
