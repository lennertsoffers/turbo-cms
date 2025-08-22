"use server";

import * as I18nService from "@/services/server/i18n/i18n.service";

export const switchLanguageAction = async (newLanguage: string) => {
    if(!I18nService.isSupportedLanguage(newLanguage)) {
        // TODO - Error handling
        throw new Error("Language not supported");
    }

    // TODO - Implement language switch
    console.log("SWITCHED LANGUAGE");
};
