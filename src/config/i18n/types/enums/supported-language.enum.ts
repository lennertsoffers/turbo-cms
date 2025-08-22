import { Enum } from "@/utils/type/enum.utils";

export const SupportedLanguage = {
    en: "en",
    nl: "nl"
} as const;

export type SupportedLanguageEnum = Enum<typeof SupportedLanguage>;
