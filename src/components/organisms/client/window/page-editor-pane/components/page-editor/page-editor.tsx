"use client";

import { useTranslation } from "@payloadcms/ui";

import { FormErrors } from "@/components/atoms/shared/form/form-errors/form-errors";
import { FormFieldMedia } from "@/components/molecules/client/form/form-field-media/form-field-media";
import { FormFieldPagePath } from "@/components/molecules/client/form/form-field-page-path/form-field-page-path";
import { FormField } from "@/components/molecules/client/form/form-field/form-field";
import { BaseTranslations } from "@/config/i18n/translations.config";
import { TranslationKey } from "@/config/i18n/types/translation-keys.types";
import { getStateValues } from "@/utils/react/forms/form.utils";

import { UpdatePageActionState } from "../../actions/update-page.action";

import styles from "./page-editor.module.scss";

type PageEditorProps = {
    formState: UpdatePageActionState;
    formPending: boolean;
};

export const PageEditor = ({
    formState,
    formPending
}: PageEditorProps) => {
    const { t } = useTranslation<BaseTranslations, TranslationKey>();

    const { fieldValues, fieldErrors, formErrors } = getStateValues(formState);

    return (
        <>
            <h2 className={styles["page-editor__title"]}>
                {t("custom:window:pane:page_editor:body:title")}
            </h2>
            <input
                name={"id"}
                type={"hidden"}
                value={fieldValues?.id}
            />
            <FormErrors errors={formErrors} />
            <FormFieldPagePath
                label={"Path"}
                name={"path"}
                // TODO - Default value
            />
            <FormFieldMedia
                defaultMedia={undefined}
                label={t("custom:window:pane:page_editor:body:form_fields:favicon")}
                name={"favicon"}
                size={"icon"}
            />
            <FormField
                defaultValue={fieldValues?.title}
                disabled={formPending}
                errors={fieldErrors?.title}
                label={t("custom:window:pane:page_editor:body:form_fields:title")}
                name={"title"}
                type={"text"}
            />
            <FormField
                defaultValue={fieldValues?.description}
                disabled={formPending}
                errors={fieldErrors?.description}
                label={t("custom:window:pane:page_editor:body:form_fields:description")}
                name={"description"}
                type={"text"}
            />
        </>
    );
};
