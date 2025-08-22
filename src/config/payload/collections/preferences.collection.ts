import { CollectionConfig } from "payload";

import { SupportedLanguages } from "../../i18n/supported-language.config";
import { BaseI18nConfig } from "../../i18n/translations.config";

export const Preferences: CollectionConfig = {
    slug: "preferences",
    labels: {
        plural: {
            en: "preferences",
            nl: "voorkeuren"
        },
        singular: {
            en: "preference",
            nl: "voorkeur"
        }
    },
    admin: {
        useAsTitle: "user"
    },
    fields: [
        {
            name: "user",
            label: {
                en: "user",
                nl: "gebruiker"
            },
            type: "relationship",
            relationTo: "users",
            required: true,
            unique: true
        },
        {
            name: "language",
            label: {
                en: "language",
                nl: "taal"
            },
            type: "select",
            options: SupportedLanguages,
            defaultValue: BaseI18nConfig.fallbackLanguage
        }
    ],
    access: {
        admin: () => true,
        read: () => true,
        delete: () => true
    }
};
