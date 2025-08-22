"use client";

import Link from "next/link";
import { ReactNode } from "react";

type LinkActionProps = {
    href: string;
    className?: string;
    children: ReactNode;
};

export const LinkAction = async ({
    href,
    className,
    children
}: LinkActionProps) => (
    <Link
        className={className}
        href={href}
        target={"_blank"}
    >
        {children}
    </Link>
);
