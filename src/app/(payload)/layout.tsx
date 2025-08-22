import type { ServerFunctionClient } from "payload";

import "@payloadcms/next/css";
import {
    handleServerFunctions,
    RootLayout
} from "@payloadcms/next/layouts";
import { ReactNode } from "react";

import { Turbo } from "@/turbo";

import { importMap } from "./admin/importMap";

import "./custom.scss";

const serverFunctions: ServerFunctionClient = async function (args) {
    "use server";

    return handleServerFunctions({
        ...args,
        config: Turbo.getSanitizedPayloadConfig(),
        importMap: importMap
    });
};

type Args = { children: ReactNode; };

const Layout = async ({ children }: Args) => {
    return (
        <RootLayout
            config={Turbo.getSanitizedPayloadConfig()}
            importMap={importMap}
            serverFunction={serverFunctions}
        >
            {children}
        </RootLayout>
    );
};

export default Layout;
