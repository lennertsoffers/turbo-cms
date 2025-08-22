import {
    Album02Icon,
    DashboardSquare02Icon,
    Database02Icon,
    Logout01Icon,
    Settings01Icon,
    Tag01Icon,
    UserShield01Icon,
    WebDesign01Icon
} from "hugeicons-react";

import { NavItem } from "@/types/components/navigation/nav-item.types";

import { Path } from "../network/paths.config";

export const NAV_ITEMS_MAIN: NavItem[] = [
    {
        link: Path.CONSOLE_DASHBOARD,
        labelTk: "custom:navigation:nav:main:console_dashboard",
        Icon: DashboardSquare02Icon
    },
    {
        link: Path.CONSOLE_WEBSITE,
        labelTk: "custom:navigation:nav:main:console_website",
        Icon: WebDesign01Icon
    },
    {
        link: Path.CONSOLE_CONTENT,
        labelTk: "custom:navigation:nav:main:console_content",
        Icon: Database02Icon
    },
    {
        link: Path.CONSOLE_BRAND,
        labelTk: "custom:navigation:nav:main:console_brand",
        Icon: Tag01Icon
    },
    {
        link: Path.CONSOLE_MEDIA,
        labelTk: "custom:navigation:nav:main:console_media",
        Icon: Album02Icon
    },
    {
        link: Path.CONSOLE_ADMIN,
        labelTk: "custom:navigation:nav:main:console_admin",
        Icon: UserShield01Icon
    }
];

export const NAV_ITEMS_ACCOUNT: NavItem[] = [
    {
        link: Path.ACCOUNT,
        labelTk: "custom:navigation:nav:account:account",
        Icon: Settings01Icon
    },
    {
        link: Path.LOGOUT,
        labelTk: "custom:navigation:nav:account:log_out",
        Icon: Logout01Icon
    }
];
