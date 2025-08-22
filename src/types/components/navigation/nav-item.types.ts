import { TranslationKey } from "@/config/i18n/types/translation-keys.types";

import { IconComponent } from "../../domain/__TODO__/icon.component";

export type NavItem = {
    labelTk: TranslationKey;
    link: string;
    Icon: IconComponent;
};
