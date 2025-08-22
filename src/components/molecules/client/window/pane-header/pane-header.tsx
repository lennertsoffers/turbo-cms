"use client";

import {
    useTranslation,
    XIcon
} from "@payloadcms/ui";
import { Cancel01Icon } from "hugeicons-react";
import { ReactNode } from "react";

import { Button } from "@/components/atoms/shared/general/button/button";
import { ButtonVariant } from "@/components/atoms/shared/general/button/enums/button-variant.enum";
import { BaseTranslations } from "@/config/i18n/translations.config";
import { TranslationKey } from "@/config/i18n/types/translation-keys.types";

import styles from "./pane-header.module.scss";

type PaneHeaderProps = {
    title?: string;
    headerButtons: ReactNode[];
    close: () => void;
};

export const PaneHeader = ({
    headerButtons,
    title,
    close
}: PaneHeaderProps) => {
    const handleOnClick = close;

    return (
        <header className={styles["pane-header"]}>
            <ul className={styles["pane-header__group"]}>
                <li>
                    <Button
                        Icon={Cancel01Icon}
                        className={styles["pane-header__icon"]}
                        color={"primary"}
                        variant={ButtonVariant.SOLID}
                        onClick={handleOnClick}
                    >
                        <XIcon />
                    </Button>
                </li>
            </ul>
            {!!title && (
                <h3 className={styles["pane-header__title"]}>
                    {title}
                </h3>
            )}
            <ul className={styles["pane-header__group"]}>
                {headerButtons.map((headerButton, index) => (
                    <li key={index}>
                        {headerButton}
                    </li>
                ))}
            </ul>
        </header>
    );
};
