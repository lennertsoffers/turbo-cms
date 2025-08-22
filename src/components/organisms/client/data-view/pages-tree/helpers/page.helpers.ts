import {
    File02Icon,
    Files01Icon,
    Folder01Icon
} from "hugeicons-react";

import { FullPage } from "@/types/components/dnd/page.types";
import { IconComponent } from "@/types/domain/__TODO__/icon.component";
import { PageType } from "@/types/domain/page/page-type.enum";
import { isNotEmpty } from "@/utils/general/array.utils";

type GetIcon = (page: FullPage) => IconComponent;
export const getIcon: GetIcon = (page) => {
    if(page.type === PageType.FOLDER) {
        return Folder01Icon;
    }

    return isNotEmpty(page.children)
        ? Files01Icon
        : File02Icon;
};

