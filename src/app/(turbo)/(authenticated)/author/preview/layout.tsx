"use server";

import { PropsWithChildren } from "react";

type AuthorPreviewLayoutProps = PropsWithChildren<{}>;

const AuthorPreviewLayout = async ({ children }: AuthorPreviewLayoutProps) => {
    return (
        <>
            {children}
            <div>
                {"TEST"}
            </div>
        </>
    );
};

export default AuthorPreviewLayout;
