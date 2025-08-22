"use server";

import { TranslationProvider } from "@payloadcms/ui";
import { PropsWithChildren } from "react";

import { SupportedLanguageDateFnsKey } from "@/config/i18n/date-fns-key.config";
import {
    SupportedLanguageLabel,
    SupportedLanguages
} from "@/config/i18n/supported-language.config";
import { BaseI18nConfig } from "@/config/i18n/translations.config";
import { SupportedLanguageEnum } from "@/config/i18n/types/enums/supported-language.enum";

import { switchLanguageAction } from "./actions/switch-language.action";

type ServerProvidersProps = PropsWithChildren<{
    language: SupportedLanguageEnum;
}>;

export const ServerProvider = async ({ language, children }: ServerProvidersProps) => {
    return (
        <TranslationProvider
            languageOptions={SupportedLanguages.map((supportedLanguage) => ({
                value: supportedLanguage,
                label: SupportedLanguageLabel[supportedLanguage]
            }))}
            dateFNSKey={SupportedLanguageDateFnsKey[language]}
            fallbackLang={BaseI18nConfig.fallbackLanguage}
            language={language}
            switchLanguageServerAction={switchLanguageAction}
            translations={BaseI18nConfig.translations[language]}
        >
            {children}
        </TranslationProvider>
    );
};
