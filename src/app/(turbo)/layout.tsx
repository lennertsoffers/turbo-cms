"use server";

import classNames from "classnames";
import { Manrope } from "next/font/google";
import { PropsWithChildren } from "react";

import { PaneManager } from "@/components/utils/client/pane-manager/pane-manager";
import * as I18nService from "@/services/server/i18n/i18n.service";

import { ClientProvider } from "./_providers/client.provider";
import { ServerProvider } from "./_providers/server.provider";

import "./main.scss";
import "./reset.scss";
import styles from "./root.module.scss";

type RootLayoutProps = PropsWithChildren<{}>;

const openSans = Manrope({
    weight: [
        "300",
        "400",
        "500",
        "600",
        "700",
        "800"
    ],
    style: [ "normal" ],
    subsets: [
        "latin",
        "latin-ext"
    ],
    display: "swap"
});

const RootLayout = async ({ children }: RootLayoutProps) => {
    const language = await I18nService.getLanguage();

    return (
        <html lang={language}>
            <body className={classNames(
                styles.body,
                openSans.className
            )}
            >
                <ServerProvider language={language}>
                    <ClientProvider>
                        {children}
                        <PaneManager />
                    </ClientProvider>
                </ServerProvider>
            </body>
        </html>
    );
};

export default RootLayout;
