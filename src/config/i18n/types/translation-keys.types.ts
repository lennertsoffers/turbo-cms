import { NestedKeysStripped } from "@payloadcms/translations";

import { BaseTranslations } from "../translations.config";

export type TranslationKey = NestedKeysStripped<BaseTranslations>;
