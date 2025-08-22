"use server";

import { Page } from "@/config/payload/payload.types";
import * as PageService from "@/services/shared/page/page.service";
import { Turbo } from "@/turbo";
import {
    FormAction,
    FormActionState,
    FormActionStateType
} from "@/types/next/action/form-action.types";
import { isDefined } from "@/utils/general/object.utils";
import { getId } from "@/utils/payload/collection/collection.utils";
import { validateInput } from "@/utils/react/forms/form.utils";

import { createTree } from "../helpers/create.helpers";
import {
    CreatePageModel,
    CreatePageSchema
} from "../schemas/create-page.schema";

export type CreatePageActionState = FormActionState<Page, CreatePageModel>;

type CreatePageAction = FormAction<Page, CreatePageModel>;

export const createPageAction: CreatePageAction = async (
    _previousState,
    formData
) => {
    const {
        rawFields,
        validatedFields,
        buildErrorResponse
    } = validateInput(
        CreatePageSchema,
        formData
    );

    const path = PageService.sanitizePath(rawFields.path ?? "");
    const pathSegments = PageService.parsePath(path);

    if(!pathSegments.length) {
        // TODO - The path has to have at least one segment
        return buildErrorResponse();
    }

    if(!validatedFields.success) {
        return buildErrorResponse();
    }

    const payload = await Turbo.getPayload();

    const root = pathSegments.length === 1;

    const parentPage = root
        ? undefined
        : await createTree(payload)(pathSegments.slice(
            0,
            -1
        ));

    if(!isDefined(parentPage) && !root) {
        // TODO - Error path could not be resolved
        return buildErrorResponse();
    }

    // TODO - Default favicon
    const page = await payload.create({
        collection: "pages",
        data: {
            root: root,
            type: validatedFields.data.type,
            path: path,
            children: [],
            title: validatedFields.data.title,
            description: validatedFields.data.description,
            favicon: validatedFields.data.favicon
        }
    });

    if(isDefined(parentPage)) {
        await payload.update({
            collection: "pages",
            id: parentPage.id,
            data: {
                children: [
                    ...parentPage.children?.map(getId) ?? [],
                    page.id
                ]
            }
        });
    }

    return {
        type: FormActionStateType.SUCCESS,
        data: page
    };
};
