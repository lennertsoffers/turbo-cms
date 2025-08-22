"use client";

import {
    QueryClient,
    QueryClientProvider
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import axios from "axios";
import { PropsWithChildren } from "react";

import { PointerContextProvider } from "@/context/pointer.context";
import { PayloadClient } from "@/payload/api/api.rest";

type ClientProviderProps = PropsWithChildren<{}>;

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false
        }
    }
});

const axiosInstance = axios.create();

export const ClientProvider = ({ children }: ClientProviderProps) => {
    PayloadClient.init(axiosInstance);

    return (
        <PointerContextProvider>
            <QueryClientProvider client={queryClient}>
                {children}
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </PointerContextProvider>
    );
};
