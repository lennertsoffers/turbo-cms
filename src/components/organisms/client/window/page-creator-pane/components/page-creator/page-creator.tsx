"use client";

import { useTranslation } from "@payloadcms/ui";

import { FormErrors } from "@/components/atoms/shared/form/form-errors/form-errors";
import { FormField } from "@/components/molecules/client/form/form-field/form-field";
import { BaseTranslations } from "@/config/i18n/translations.config";
import { TranslationKey } from "@/config/i18n/types/translation-keys.types";
import { getStateValues } from "@/utils/react/forms/form.utils";

import { CreatePageActionState } from "../../actions/create-page.action";

type PageCreatorProps = {
    formState: CreatePageActionState;
    formPending: boolean;
};

export const PageCreator = ({
    formState,
    formPending
}: PageCreatorProps) => {
    const { t } = useTranslation<BaseTranslations, TranslationKey>();

    const { fieldValues, fieldErrors, formErrors } = getStateValues(formState);

    return (
        <>
            <h2>
                {t("custom:window:pane:page_creator:body:title")}
            </h2>
            <FormErrors errors={formErrors} />
            {/* <FormFieldPagePath
                label={"Path"}
                name={"path"}
            /> */}
            {/* <FormLabelFieldRadioToggle
                options={[
                    {
                        Icon: File02Icon,
                        value: "PAGE",
                        label: "Page",
                        defaultChecked: true
                    },
                    {
                        Icon: Folder01Icon,
                        value: "FOLDER",
                        label: "Folder"
                    }
                ]}
                label={"type"}
                name={"type"}
            /> */}
            {/* <FormFieldAsset
                defaultAsset={undefined}
                label={"Favicon"}
                name={"favicon"}
                size={"icon"}
            /> */}
            <FormField
                defaultValue={fieldValues?.title}
                disabled={formPending}
                errors={fieldErrors?.title}
                label={t("custom:window:pane:page_creator:body:form_fields:title")}
                name={"title"}
                type={"text"}
            />
            <FormField
                defaultValue={fieldValues?.description}
                disabled={formPending}
                errors={fieldErrors?.description}
                label={t("custom:window:pane:page_creator:body:form_fields:description")}
                name={"description"}
                type={"text"}
            />
        </>
    );
};
