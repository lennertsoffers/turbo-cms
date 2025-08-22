"use client";

import { ReactNode } from "react";

import styles from "./pane-footer.module.scss";

type PaneFooterProps = {
    footerButtons: ReactNode[];
};

export const PaneFooter = ({ footerButtons }: PaneFooterProps) => {
    return (
        <footer className={styles["pane-footer"]}>
            <ul className={styles["pane-footer__group"]}>
                {footerButtons.map((footerButton, index) => (
                    <li key={index}>
                        {footerButton}
                    </li>
            ))}
            </ul>
        </footer>
    );
};
