"use server";

import { PropsWithChildren } from "react";

type UnAuthenticatedLayoutProps = PropsWithChildren<{}>;

const UnAuthenticatedLayout = async ({ children }: UnAuthenticatedLayoutProps) => {
    return children;
};

export default UnAuthenticatedLayout;
