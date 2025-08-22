"use client";

import { useTranslation } from "@payloadcms/ui";
import classNames from "classnames";
import { PencilEdit01Icon } from "hugeicons-react";

import { BaseTranslations } from "@/config/i18n/translations.config";
import { TranslationKey } from "@/config/i18n/types/translation-keys.types";

import styles from "./edit-upload.module.scss";

type EditUploadProps = {
    active: boolean;
    htmlFor: string;
    previewUrl: string;
    className?: string;
};

export const EditUpload = ({
    active,
    htmlFor,
    previewUrl,
    className
}: EditUploadProps) => {
    const { t } = useTranslation<BaseTranslations, TranslationKey>();

    return (
        <label
            className={classNames(
                styles["edit-upload"],
                active && styles["edit-upload--active"],
                className
            )}
            htmlFor={htmlFor}
        >
            <PencilEdit01Icon className={styles["edit-upload__icon"]} />
            <p className={styles["edit-upload__change"]}>
                {t("custom:general:form:file_upload:edit_upload")}
            </p>
            <img
                alt={""}
                className={styles["edit-upload__preview"]}
                src={previewUrl}
            />
        </label>
    );
};
