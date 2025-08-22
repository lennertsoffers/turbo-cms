"use server";

import { PropsWithChildren } from "react";

import { t } from "@/services/server/i18n/i18n.service";
import * as UserService from "@/services/server/user/user.service";

import styles from "./header.module.scss";

type HeaderProps = PropsWithChildren<{
    title: string;
}>;

export const Header = async ({ title }: HeaderProps) => {
    const { firstName } = await UserService.getUser();

    const welcome = await t("custom:navigation:header:subtitle:welcome");

    return (
        <header className={styles["header"]}>
            <h1 className={styles["header__title"]}>
                {title}
            </h1>
            <p className={styles["header__greeting"]}>
                {welcome}
                {", "}
                <span className={styles["header__greeting__name"]}>
                    {firstName}
                </span>
                {"!"}
            </p>
        </header>
    );
};
