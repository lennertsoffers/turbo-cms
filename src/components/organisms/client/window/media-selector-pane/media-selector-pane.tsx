"use client";

import { useTranslation } from "@payloadcms/ui";
import { CheckmarkBadge02Icon } from "hugeicons-react";
import { useState } from "react";

import { Button } from "@/components/atoms/shared/general/button/button";
import { ButtonVariant } from "@/components/atoms/shared/general/button/enums/button-variant.enum";
import { PaneComponentType } from "@/components/utils/client/pane/enums/pane-component-type.enum";
import { Pane } from "@/components/utils/client/pane/pane";
import { BaseTranslations } from "@/config/i18n/translations.config";
import { TranslationKey } from "@/config/i18n/types/translation-keys.types";
import { PaneType as PaneEnum } from "@/config/panes/enums/pane-type.enum";
import { PaneProps } from "@/config/panes/types/pane-props.types";
import { Media } from "@/config/payload/payload.types";
import { usePane } from "@/hooks/window/use-pane-OLD.hook";
import { MediaSelectedEvent } from "@/services/client/event/models/media-selected.event";
import { isDefined } from "@/utils/general/object.utils";

import { MediaSelector } from "../../crud/media-selector/media-selector";

type MediaSelectorPaneProps = PaneProps<{}>;

export const MediaSelectorPane = ({
    paneId,
    paneState
}: MediaSelectorPaneProps) => {
    const { t } = useTranslation<BaseTranslations, TranslationKey>();

    const { closePane } = usePane();

    const [
        media,
        setMedia
    ] = useState<Media | undefined>(undefined);

    const close = () => closePane(PaneEnum.MEDIA_SELECTOR);

    const handleOnCloseClick = close;

    const handleOnConfirmClick = () => {
        if(!isDefined(media)) return;

        dispatchEvent(new MediaSelectedEvent(media));
        close();
    };

    const FooterButtons = [
        <Button
            color={"primary"}
            key={"cancel"}
            variant={ButtonVariant.OUTLINE}
            onClick={handleOnCloseClick}
        >
            {t("custom:window:pane:media_selector:footer:cancel")}
        </Button>,
        <Button
            Icon={CheckmarkBadge02Icon}
            color={"primary"}
            disabled={!isDefined(media)}
            key={"confirm"}
            title={t("custom:window:pane:media_selector:footer:confirm")}
            variant={ButtonVariant.SOLID}
            onClick={handleOnConfirmClick}
        >
            {t("custom:window:pane:media_selector:footer:confirm")}
        </Button>
    ];

    return (
        <Pane
            footerButtons={FooterButtons}
            pane={PaneEnum.MEDIA_CREATOR}
            paneId={paneId}
            paneState={paneState}
            resetOnClose={true}
            title={t("custom:window:pane:media_selector:title")}
            type={PaneComponentType.ASIDE}
        >
            <MediaSelector
                media={media}
                setMedia={setMedia}
            />
        </Pane>
    );
};
