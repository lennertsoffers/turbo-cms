"use server";

import { NavItem } from "@/components/atoms/client/navigation/nav-item/nav-item";
import { t } from "@/services/server/i18n/i18n.service";
import { NavItem as TNavItem } from "@/types/components/navigation/nav-item.types";

import styles from "./nav.module.scss";

type NavProps = {
    navItems: TNavItem[];
};
export const Nav = async ({ navItems }: NavProps) => {
    return (
        <nav className={styles["nav"]}>
            <ul className={styles["nav__items"]}>
                {navItems.map(async ({ link, labelTk, Icon }) => (
                    <li key={link}>
                        <NavItem
                            Icon={<Icon />}
                            href={link}
                            label={await t(labelTk)}
                        />
                    </li>
            ))}
            </ul>
        </nav>
    );
};
