"use client";

import classNames from "classnames";
import {
    ChangeEvent,
    DragEvent,
    useState
} from "react";

import { isDefined } from "@/utils/general/object.utils";

import { DropzoneUpload } from "./components/dropzone-upload/dropzone-upload";
import { EditUpload } from "./components/edit-upload/edit-upload";

import styles from "./form-field-upload.module.scss";

type UploadFieldProps = {
    name: string;
    className?: string;
};

export const UploadField = ({
    name,
    className
}: UploadFieldProps) => {
    const [
        previewUrl,
        setPreviewUrl
    ] = useState<string | undefined>(undefined);
    const [
        active,
        setActive
    ] = useState<boolean>(false);

    const handleOnFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if(!isDefined(file)) return;

        setActive(false);
        setPreviewUrl(URL.createObjectURL(file));
    };

    const handleOnFileDragEnter = (event: DragEvent<HTMLInputElement>) => {
        if(!event.dataTransfer.types.includes("Files")) return;

        setActive(true);
    };

    const handleOnFileDragLeave = () => setActive(false);

    const handleOnPointerEnter = () => {
        if(!previewUrl) return;

        setActive(true);
    };

    const handleOnPointerLeave = () => setActive(false);

    return (
        <section className={classNames(
            styles["upload-field"],
            className
        )}
        >
            {!previewUrl && (
                <DropzoneUpload
                    active={active}
                    htmlFor={name}
                />
            )}
            {!!previewUrl && (
                <EditUpload
                    active={active}
                    htmlFor={name}
                    previewUrl={previewUrl}
                />
            )}
            <input
                accept={"image/*"}
                className={styles["upload-field__input"]}
                id={name}
                multiple={false}
                name={name}
                type={"file"}
                onChange={handleOnFileChange}
                onDragEnter={handleOnFileDragEnter}
                onDragLeave={handleOnFileDragLeave}
                onPointerEnter={handleOnPointerEnter}
                onPointerLeave={handleOnPointerLeave}
            />
        </section>
    );
};
