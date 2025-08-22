"use server";

import { redirect } from "next/navigation";

import {
    SupportedLanguage,
    SupportedLanguageEnum
} from "@/config/i18n/types/enums/supported-language.enum";
import { Path } from "@/config/network/paths.config";
import * as I18nService from "@/services/server/i18n/i18n.service";
import * as CookieService from "@/services/server/network/cookie.service";
import { Turbo } from "@/turbo";
import { Cookie } from "@/types/domain/network/cookie.enum";
import {
    FormAction,
    FormActionState
} from "@/types/next/action/form-action.types";
import { identityPromise } from "@/utils/fp/identity/identity.utils";
import { extracting } from "@/utils/general/array.utils";
import { isDefined } from "@/utils/general/object.utils";
import { orFindById } from "@/utils/payload/collection/collection.utils";
import { validateInput } from "@/utils/react/forms/form.utils";

import {
    LoginModel,
    LoginSchema
} from "../schemas/login.schema";

export type LoginActionState = FormActionState<LoginModel, LoginModel>;

const setCookies = (token: string, exp: number, language: SupportedLanguageEnum) => Promise.all([
    CookieService.setCookie({
        name: Cookie.LANGUAGE,
        value: language,
        secure: true
    }),
    CookieService.setCookie({
        name: Cookie.TOKEN,
        value: token,
        expires: Date.now() + exp,
        secure: true,
        httpOnly: true,
        priority: "high"
    })
]);

const createLanguagePreference =
    (userId: string) =>
    async () => {
        const payload = await Turbo.getPayload();

        const language = await I18nService.getLanguageByHeader();
        const newLanguage = language.unwrapOr(SupportedLanguage.en);

        const { id } = await payload.create({
            collection: "preferences",
            data: {
                language: newLanguage,
                user: userId
            }
        });

        await payload.update({
            collection: "users",
            id: userId,
            data: {
                preferences: id
            }
        });

        return newLanguage;
    };

type LoginAction = FormAction<LoginModel, LoginModel>;

export const loginAction: LoginAction = async (_, formData) => {
    const {
        validatedFields,
        buildErrorResponse
    } = validateInput(
        LoginSchema,
        formData
    );

    if(!validatedFields.success) {
        return buildErrorResponse();
    }

    const payload = await Turbo.getPayload();

    const { exp, token, user } = await payload.login({
        collection: "users",
        data: validatedFields.data,
        depth: 1
    });

    if(!isDefined(token) || !isDefined(exp) || !isDefined(user)) {
        return buildErrorResponse({
            formErrors: [
                // TODO - TK
                "The email and password do not match"
            ]
        });
    }

    const preference = await orFindById(payload)("preferences")(user.preferences);
    const language = await preference
        .mapNullable(extracting("language"))
        .fold(
            createLanguagePreference(user.id),
            identityPromise
        );

    await setCookies(
        token,
        exp,
        language
    );

    return redirect(Path.CONSOLE_DASHBOARD);
};
