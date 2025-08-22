"use client";

import classNames from "classnames";
import {
    useId,
    useState
} from "react";

import { Button } from "@/components/atoms/shared/general/button/button";
import { ButtonVariant } from "@/components/atoms/shared/general/button/enums/button-variant.enum";
import { PaneType } from "@/config/panes/enums/pane-type.enum";
import { Media } from "@/config/payload/payload.types";
import { useEventService } from "@/hooks/service/use-event-service.hook";
import { usePane } from "@/hooks/window/pane/use-pane.hook";
import { Event } from "@/services/client/event/types/event.enum";

import styles from "./form-field-media.module.scss";

type FormFieldmediaProps = {
    defaultMedia: Media | undefined;
    size: "icon" | "thumbnail";
    name: string;
    label: string;
};

export const FormFieldMedia = ({
    defaultMedia,
    size,
    name,
    label
}: FormFieldmediaProps) => {
    const inputId = useId();

    const { openPane, getLastPaneId } = usePane();

    const [
        media,
        setMedia
    ] = useState<Media | undefined>(defaultMedia);

    const previewUrl = media?.sizes?.[size]?.url ?? media?.url;

    const handleOnOpenMediaSelector = () => openPane(
        PaneType.MEDIA_SELECTOR,
        {},
        getLastPaneId()
    );

    useEventService({
        [Event.MEDIA_SELECTED]: (event) => setMedia(event.media)
    });

    return (
        <>
            <label htmlFor={inputId}>
                {!previewUrl && (
                    <Button
                        color={"primary"}
                        variant={ButtonVariant.SOLID}
                        onClick={handleOnOpenMediaSelector}
                    >
                        {"Open"}
                    </Button>
                )}
                {!!previewUrl && (
                    <>
                        <p className={styles["form-field-media__label"]}>
                            {label}
                        </p>
                        <p
                            className={classNames(
                                styles["form-field-media__preview"],
                                size === "icon" && styles["form-field-media__preview--icon"],
                                size === "thumbnail" && styles["form-field-media__preview--thumbnail"]
                            )}
                            onClick={handleOnOpenMediaSelector}
                        >
                            <img
                                alt={media?.alt ?? undefined}
                                src={previewUrl}
                            />
                            <span>
                                {media?.name ?? undefined}
                            </span>
                        </p>
                    </>
                )}
            </label>
            <input
                id={inputId}
                name={name}
                type={"hidden"}
                value={media?.id ?? ""}
            />
        </>
    );
};
