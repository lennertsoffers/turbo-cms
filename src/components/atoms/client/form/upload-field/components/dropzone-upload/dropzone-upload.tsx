"use client";

import { useTranslation } from "@payloadcms/ui";
import classNames from "classnames";
import { CloudUploadIcon } from "hugeicons-react";

import { BaseTranslations } from "@/config/i18n/translations.config";
import { TranslationKey } from "@/config/i18n/types/translation-keys.types";

import styles from "./dropzone-upload.module.scss";

type DropzoneUploadProps = {
    active: boolean;
    htmlFor: string;
    className?: string;
};

export const DropzoneUpload = ({
    active,
    htmlFor,
    className
}: DropzoneUploadProps) => {
    const { t } = useTranslation<BaseTranslations, TranslationKey>();

    return (
        <label
            className={classNames(
                styles["dropzone-upload"],
                active && styles["dropzone-upload--active"],
                className
            )}
            htmlFor={htmlFor}
        >
            <CloudUploadIcon className={styles["dropzone-upload__icon"]} />
            <p className={styles["dropzone-upload__drag-and-drop"]}>
                <span className={styles["dropzone-upload__drag-and-drop__click-to-upload"]}>
                    {t("custom:general:form:file_upload:click_to_upload")}
                </span>
                {" "}
                {t("custom:general:form:file_upload:or_drag_and_drop")}
            </p>
            <p className={styles["dropzone-upload__file-specifications"]}>
                {t("custom:general:form:file_upload:file_specifications")}
            </p>
        </label>
    );
};
