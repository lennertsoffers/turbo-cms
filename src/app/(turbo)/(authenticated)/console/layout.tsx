"use server";

import { ReactNode } from "react";

import { Head } from "@/components/atoms/server/brand/head/head";
import { Nav } from "@/components/molecules/server/navigation/nav/nav";
import { Account } from "@/components/organisms/server/navigation/account/account";
import {
    NAV_ITEMS_ACCOUNT,
    NAV_ITEMS_MAIN
} from "@/config/navigation/navigation.config";
import { Path } from "@/config/network/paths.config";

import styles from "./layout.module.scss";

type ConsoleLayoutProps = {
    children: ReactNode;
};

const ConsoleLayout = async ({ children }: ConsoleLayoutProps) => {
    return (
        <main className={styles["console"]}>
            <aside className={styles["console__navigation"]}>
                <Head />
                <Nav navItems={NAV_ITEMS_MAIN} />
                <Account
                    accountLinkHref={Path.ACCOUNT}
                    className={styles["console__navigation__account"]}
                    navItems={NAV_ITEMS_ACCOUNT}
                />
            </aside>
            <section className={styles["console__content"]}>
                {children}
            </section>
        </main>
    );
};

export default ConsoleLayout;
