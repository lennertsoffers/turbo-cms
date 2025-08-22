"use server";

import { PropsWithChildren } from "react";

type AuthorEditLayoutProps = PropsWithChildren<{}>;

const AuthorEditLayout = async ({ children }: AuthorEditLayoutProps) => {
    return (
        <>
            {children}
        </>
    );
};

export default AuthorEditLayout;
