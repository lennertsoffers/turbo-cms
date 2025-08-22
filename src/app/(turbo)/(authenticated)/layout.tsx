"use server";

import { redirect } from "next/navigation";
import { ReactNode } from "react";

import { Path } from "@/config/network/paths.config";
import * as AuthenticationService from "@/services/server/authentication/authentication.service";

type AuthenticatedLayoutProps = {
    children: ReactNode;
};

const AuthenticatedLayout = async ({ children }: AuthenticatedLayoutProps) => {
    if(!(await AuthenticationService.isLoggedIn())) {
        return redirect(Path.LOGIN);
    }

    return children;
};

export default AuthenticatedLayout;
