import { OK } from "http-status";
import {
    NextRequest,
    NextResponse
} from "next/server";

import { Turbo } from "@/turbo";
import {
    SupportedLanguage,
    SupportedLanguageEnum
} from "@turbo-cms/config/i18n/types/enum/supported-language.enum";
import { LocalPayload } from "@turbo-cms/payload/api/local";
import * as I18nService from "@turbo-cms/services/server/i18n/i18n.service";
import * as CookieService from "@turbo-cms/services/server/network/cookie.service";
import { Cookie } from "@turbo-cms/types-models/network/cookie.enum";
import { identityPromise } from "@/utils/fp/identity";
import { extracting } from "@/utils/general/array.utils";
import { isDefined } from "@/utils/general/object.utils";
import { orFindById } from "@/utils/payload/collection";

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
        const newLanguage = (await I18nService.getLanguageByHeader())
            .unwrapOr(SupportedLanguage.en);

        const { id } = await LocalPayload.create("preferences")({
            language: newLanguage,
            user: userId
        });

        await LocalPayload.updateById("users")(
            userId,
            {
                preferences: id
            }
        );

        return newLanguage;
    };

export const POST = async (request: NextRequest): Promise<NextResponse> => {
    const payload = await Turbo.getPayload();

    const { exp, token, user } = await payload.login({
        collection: "users",
        data: await request.json(),
        depth: 1
    });

    if(!isDefined(token) || !isDefined(exp) || !isDefined(user)) {
        // TODO - Error handling
        throw new Error("Undefined");
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

    return NextResponse.json(
        {
            user: user
        },
        {
            status: OK
        }
    );
};
