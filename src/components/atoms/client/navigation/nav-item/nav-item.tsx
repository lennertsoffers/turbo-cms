"use client";

import { usePathname } from "next/navigation";
import { ReactElement } from "react";

import { LinkVariant } from "@/components/atoms/shared/general/link/enums/link-variant.enum";
import { Link } from "@/components/atoms/shared/general/link/link";

type NavItemProps = {
    label: string;
    href: string;
    Icon: ReactElement;
};

export const NavItem = ({ label, href, Icon }: NavItemProps) => {
    const pathName = usePathname();

    const active = href.includes(pathName);

    const variant = active
        ? LinkVariant.SOLID
        : LinkVariant.OUTLINE;

    return (
        <Link
            Icon={Icon}
            color={"primary"}
            href={href}
            variant={variant}
        >
            {label}
        </Link>
    );
};
