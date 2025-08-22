"use client";

import Form from "next/form";
import Link from "next/link";
import { useActionState } from "react";

import { FormErrors } from "@/components/atoms/shared/form/form-errors/form-errors";
import { Button } from "@/components/atoms/shared/general/button/button";
import { ButtonVariant } from "@/components/atoms/shared/general/button/enums/button-variant.enum";
import { FormField } from "@/components/molecules/client/form/form-field/form-field";
import { Path } from "@/config/network/paths.config";
import { FormActionStateType } from "@/types/next/action/form-action.types";
import { getStateValues } from "@/utils/react/forms/form.utils";

import { loginAction } from "./actions/login.action";

import styles from "./login-form.module.scss";

type LoginFormProps = {};

export const LoginForm = ({}: LoginFormProps) => {
    const [
        state,
        formAction,
        isPending
    ] = useActionState(
        loginAction,
        {
            type: FormActionStateType.INITIAL
        }
    );

    const { fieldValues, fieldErrors, formErrors } = getStateValues(state);

    return (
        <Form
            action={formAction}
            className={styles["login-form"]}
        >
            <FormErrors errors={formErrors} />
            <FormField
                // TODO - TK
                autoComplete={"email"}
                defaultValue={fieldValues?.email}
                errors={fieldErrors?.email}
                label={"email"}
                name={"email"}
                type={"email"}
            />
            <FormField
                // TODO - TK
                autoComplete={"current-password"}
                errors={fieldErrors?.password}
                label={"password"}
                name={"password"}
                type={"password"}
            />
            <Button
                className={styles["login-form__submit"]}
                color={"primary"}
                loading={isPending}
                type={"submit"}
                variant={ButtonVariant.SOLID}
            >
                {/* TODO - TK */}
                {"Submit"}
            </Button>
            <p className={styles["login-form__sign-up"]}>
                <Link href={Path.SIGN_UP}>
                    {/* TODO - TK */}
                    {"Sign up"}
                </Link>
            </p>
        </Form>
    );
};
