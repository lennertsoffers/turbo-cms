"use server";

import { Page } from "@/config/payload/payload.types";
import { Turbo } from "@/turbo";
import {
    FormAction,
    FormActionState,
    FormActionStateType
} from "@/types/next/action/form-action.types";
import { validateInput } from "@/utils/react/forms/form.utils";

import {
    UpdatePageModel,
    UpdatePageSchema
} from "../schemas/update-page.schema";

export type UpdatePageActionState = FormActionState<Page, UpdatePageModel>;

type UpdatePageAction = FormAction<Page, UpdatePageModel>;

export const updatePageAction: UpdatePageAction = async (
    _previousState,
    formData
) => {
    const {
        validatedFields,
        buildErrorResponse
    } = validateInput(
        UpdatePageSchema,
        formData
    );

    if(!validatedFields.success) {
        return buildErrorResponse();
    }

    const payload = await Turbo.getPayload();

    // TODO - Allow updating of path
    // TODO - Error handling
    const page = await payload.update({
        collection: "pages",
        id: validatedFields.data.id,
        data: {
            title: validatedFields.data.title,
            description: validatedFields.data.description,
            favicon: validatedFields.data.favicon
        }
    });

    return {
        type: FormActionStateType.SUCCESS,
        data: page
    };
};
