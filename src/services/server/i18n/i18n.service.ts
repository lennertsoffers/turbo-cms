import { getNextRequestI18n } from "@payloadcms/next/utilities";
import { I18n } from "@payloadcms/translations";
import {
    just,
    Maybe,
    none
} from "@sweet-monads/maybe";
import Negotiator from "negotiator";

import { SupportedLanguages } from "@/config/i18n/supported-language.config";
import { BaseTranslations } from "@/config/i18n/translations.config";
import { BaseI18nConfig } from "@/config/i18n/translations.config";
import { SupportedLanguageEnum } from "@/config/i18n/types/enums/supported-language.enum";
import { TranslationKey } from "@/config/i18n/types/translation-keys.types";
import { Turbo } from "@/turbo";
import { Cookie } from "@/types/domain/network/cookie.enum";
import { Header } from "@/types/domain/network/header.enum";
import { lazyMergeAsync } from "@/utils/fp/maybe/maybe.utils";
import { extracting } from "@/utils/general/array.utils";
import { orFindById } from "@/utils/payload/collection/collection.utils";

import * as CookieService from "../network/cookie.service";
import * as HeaderService from "../network/header.service";
import * as UserService from "../user/user.service";

type IsSupportedLanguage = (language: string) => language is SupportedLanguageEnum;
export const isSupportedLanguage: IsSupportedLanguage =
    (language): language is SupportedLanguageEnum =>
        SupportedLanguages.some((supportedLanguage) => supportedLanguage === language);

type GetRequestI18n = () => Promise<I18n<BaseTranslations, TranslationKey>>;
export const getRequestI18n: GetRequestI18n = async () =>
    (getNextRequestI18n({
        config: await Turbo.getSanitizedPayloadConfig()
    }) as Promise<
        I18n<BaseTranslations, TranslationKey>
    >);

type GetLanguageByCookie = () => Promise<Maybe<SupportedLanguageEnum>>;
const getLanguageByCookie: GetLanguageByCookie = async () =>
    (await CookieService.getCookie(Cookie.LANGUAGE))
        .chain(({ value }) =>
            isSupportedLanguage(value)
                ? just(value)
                : none());

type GetLanguageByUser = () => Promise<Maybe<SupportedLanguageEnum>>;
const getLanguageByUser: GetLanguageByUser = async () => {
    const user = await UserService.getMaybeUser();

    const preferences = await user
        .mapNullable(extracting("preferences"))
        .asyncChain(orFindById(Turbo.getPayload())("preferences"));

    return preferences.mapNullable(extracting("language"));
};

type GetLanguageByHeader = () => Promise<Maybe<SupportedLanguageEnum>>;
export const getLanguageByHeader: GetLanguageByHeader = async () =>
    (await HeaderService.getHeader(Header.ACCEPT_LANGUAGE))
        .map(
            (header) =>
                new Negotiator({
                    headers: {
                        [Header.ACCEPT_LANGUAGE]: header
                    }
                })
        )
        .mapNullable((negotiator) => negotiator.language(SupportedLanguages))
        .chain((value) => (isSupportedLanguage(value)
            ? just(value)
            : none()));

type GetLanguage = () => Promise<SupportedLanguageEnum>;
export const getLanguage: GetLanguage = async () =>
    lazyMergeAsync(
        getLanguageByCookie,
        getLanguageByUser,
        getLanguageByHeader
    )
        .then((language) =>
        language.unwrapOr(BaseI18nConfig.fallbackLanguage));

type T = (key: TranslationKey, options?: Record<string, any>) => Promise<string>;
export const t: T = async (key, options) => {
    const i18n = await getRequestI18n();

    return i18n.t(
        key,
        options
    );
};
