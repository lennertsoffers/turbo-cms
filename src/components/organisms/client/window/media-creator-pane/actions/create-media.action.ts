"use server";

import { fileTypeFromBuffer } from "file-type";
import {
    File as PayloadFile,
    RequiredDataFromCollectionSlug
} from "payload";

import { Media } from "@/config/payload/payload.types";
import { Turbo } from "@/turbo";
import {
    FormAction,
    FormActionState,
    FormActionStateType
} from "@/types/next/action/form-action.types";
import { isDefined } from "@/utils/general/object.utils";
import { validateInput } from "@/utils/react/forms/form.utils";

import {
    CreateMediaModel,
    CreateMediaSchema
} from "../schemas/create-media.schema";

export type CreateMediaActionState = FormActionState<Media, CreateMediaModel>;

type CreateMediaAction = FormAction<Media, CreateMediaModel>;

export const createMediaAction: CreateMediaAction = async (_previousState, formData) => {
    // TODO - TK for errors
    const {
        rawFields,
        validatedFields,
        buildErrorResponse
    } = validateInput(
        CreateMediaSchema,
        formData
    );

    const file = rawFields.file;
    if(!file?.size) {
        return buildErrorResponse({
            fieldErrors: {
                file: [ "File is required" ]
            }
        });
    }

    const arrayBuffer = await file.arrayBuffer();
    const fileTypeResult = await fileTypeFromBuffer(arrayBuffer);
    if(!isDefined(fileTypeResult) && file.type !== "image/svg+xml") {
        return buildErrorResponse({
            fieldErrors: {
                file: [ "The filetype is invalid" ]
            }
        });
    }

    if(!validatedFields.success) {
        return buildErrorResponse();
    }

    const payload = await Turbo.getPayload();

    const fileBuffer = Buffer.from(arrayBuffer);
    const fileName = crypto.randomUUID();

    const media: RequiredDataFromCollectionSlug<"medias"> = {
        alt: validatedFields.data.alt,
        name: validatedFields.data.name,
        // TODO - Remove if no error
        url: ""
        // filename: fileName
    };

    const payloadFile: PayloadFile = {
        data: fileBuffer,
        size: file.size,
        mimetype: fileTypeResult?.mime ?? "image/svg+xml",
        name: fileName
    };

    const result = await payload.create({
        collection: "medias",
        data: media,
        file: payloadFile
    });

    return {
        type: FormActionStateType.SUCCESS,
        data: result
    };
};
