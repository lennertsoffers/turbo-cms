"use client";

import { useTranslation } from "@payloadcms/ui";
import classNames from "classnames";
import { useEffect } from "react";

import { FormErrors } from "@/components/atoms/shared/form/form-errors/form-errors";
import { FormField } from "@/components/molecules/client/form/form-field/form-field";
import { BaseTranslations } from "@/config/i18n/translations.config";
import { TranslationKey } from "@/config/i18n/types/translation-keys.types";
import { PaneType as PaneEnum } from "@/config/panes/enums/pane-type.enum";
import { usePane } from "@/hooks/window/use-pane-OLD.hook";
import { MediaCreatedEvent } from "@/services/client/event/models/media-created.event";
import { FormActionStateType } from "@/types/next/action/form-action.types";
import { getStateValues } from "@/utils/react/forms/form.utils";

import { CreateMediaActionState } from "../../actions/create-media.action";

import styles from "./media-creator.module.scss";

type MediaCreatorProps = {
    formState: CreateMediaActionState;
    formPending: boolean;
};

export const MediaCreator = ({ formState }: MediaCreatorProps) => {
    const { t } = useTranslation<BaseTranslations, TranslationKey>();

    const { closePane } = usePane();

    const { fieldValues, fieldErrors, formErrors } = getStateValues(formState);

    useEffect(
        () => {
            if(formState.type !== FormActionStateType.SUCCESS) return;

            dispatchEvent(new MediaCreatedEvent(formState.data));
            closePane(PaneEnum.MEDIA_CREATOR);
        },
        [
            formState,
            closePane
        ]
    );

    return (
        <>
            <FormErrors errors={formErrors} />
            <fieldset className={classNames(
                styles["asset-creator__fieldset"],
                styles["asset-creator__fieldset__image"]
            )}
            >
                {/* TODO - Impelement */}
                {/* <FormFieldUpload name={"file"} />
                <FormFieldErrors errors={fieldErrors?.file} /> */}
            </fieldset>
            <fieldset className={classNames(
                styles["asset-creator__fieldset"],
                styles["asset-creator__fieldset__meta"]
            )}
            >
                <FormField
                    defaultValue={fieldValues?.name}
                    errors={fieldErrors?.name}
                    label={t("custom:window:pane:media_creator:body:form_fields:name")}
                    name={"name"}
                    type={"text"}
                />
                <FormField
                    defaultValue={fieldValues?.alt}
                    errors={fieldErrors?.alt}
                    label={t("custom:window:pane:media_creator:body:form_fields:alt")}
                    name={"alt"}
                    type={"text"}
                />
            </fieldset>
        </>
    );
};

