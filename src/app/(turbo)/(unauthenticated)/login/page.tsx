"use server";

import { LoginForm } from "@/components/organisms/client/form/login-form/login-form";

type LoginPageProps = {};

const LoginPage = async ({}: LoginPageProps) => {
    return <LoginForm />;
};

export default LoginPage;
