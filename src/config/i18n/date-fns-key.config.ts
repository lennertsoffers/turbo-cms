import { DateFnsKey } from "@/payload/payload/i18n/date-fns-key.types";

import {
    SupportedLanguage,
    SupportedLanguageEnum
} from "./types/enums/supported-language.enum";

export const SupportedLanguageDateFnsKey: Record<SupportedLanguageEnum, DateFnsKey> = {
    [SupportedLanguage.en]: "en-US",
    [SupportedLanguage.nl]: "nl"
};
