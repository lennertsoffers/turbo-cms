"use server";

import { fromNullable } from "@sweet-monads/maybe";
import classNames from "classnames";

import { SeparatorDirection } from "@/components/atoms/shared/general/separator/enums/separator-direction.enum";
import { Separator } from "@/components/atoms/shared/general/separator/separator";
import { AccountLink } from "@/components/atoms/shared/navigation/account-link/account-link";
import { Nav } from "@/components/molecules/server/navigation/nav/nav";
import * as MediaService from "@/services/server/media/media.service";
import * as UserService from "@/services/server/user/user.service";
import { NavItem } from "@/types/components/navigation/nav-item.types";

import styles from "./account.module.scss";

type AccountProps = {
    navItems: NavItem[];
    accountLinkHref: string;
    className?: string;
};

export const Account = async ({
    navItems,
    accountLinkHref,
    className
}: AccountProps) => {
    const user = await UserService.getUser();
    const profileImage = await MediaService.getMedia(fromNullable(user.profileImage));

    return (
        <section className={classNames(
            styles["account"],
            className
        )}
        >
            <Nav navItems={navItems} />
            <Separator
                className={styles["account__separator"]}
                direction={SeparatorDirection.HORIZONTAL}
            />
            <AccountLink
                firstName={user.firstName}
                href={accountLinkHref}
                image={profileImage}
                lastName={user.lastName}
            />
        </section>
    );
};
