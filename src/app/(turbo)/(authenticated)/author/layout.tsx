"use server";

import { PropsWithChildren } from "react";

type AuthorLayoutProps = PropsWithChildren<{}>;

const AuthorLayout = async ({ children }: AuthorLayoutProps) => {
    return (
        <>
            {children}
        </>
    );
};

export default AuthorLayout;
