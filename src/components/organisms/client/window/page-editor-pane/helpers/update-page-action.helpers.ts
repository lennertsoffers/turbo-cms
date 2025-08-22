import { Page } from "@/config/payload/payload.types";
import { FormActionStateType } from "@/types/next/action/form-action.types";
import { isDefined } from "@/utils/general/object.utils";
import { getId } from "@/utils/payload/collection/collection.utils";

import { UpdatePageActionState } from "../actions/update-page.action";

type CreateInitialState = (page: Page) => UpdatePageActionState;

export const createInitialState: CreateInitialState = (page) => ({
    type: FormActionStateType.INITIAL,
    fieldValues: {
        id: page.id,
        title: page.title,
        description: page.description,
        path: page.path,
        favicon: isDefined(page.favicon)
            ? getId(page.favicon)
            : undefined
    }
});
