import {
    SupportedLanguage,
    SupportedLanguageEnum
} from "./types/enums/supported-language.enum";

export const SupportedLanguages = Object.values(SupportedLanguage);

export const SupportedLanguageLabel: Record<SupportedLanguageEnum, string> = {
    [SupportedLanguage.en]: "English",
    [SupportedLanguage.nl]: "Nederlands"
};
