"use client";

import { useTranslation } from "@payloadcms/ui";
import { CheckmarkBadge02Icon } from "hugeicons-react";

import { PaneComponentType } from "@/components/utils/client/pane/enums/pane-component-type.enum";
import { Pane } from "@/components/utils/client/pane/pane";
import { BaseTranslations } from "@/config/i18n/translations.config";
import { TranslationKey } from "@/config/i18n/types/translation-keys.types";
import { PaneType as PaneEnum } from "@/config/panes/enums/pane-type.enum";
import { PaneProps } from "@/config/panes/types/pane-props.types";
import { FormActionStateType } from "@/types/next/action/form-action.types";

import {
    createMediaAction,
    CreateMediaActionState
} from "./actions/create-media.action";
import { MediaCreator } from "./components/media-creator/media-creator";

type MediaCreatorPaneProps = PaneProps<{}>;

export const MediaCreatorPane = ({
    paneId,
    paneState
}: MediaCreatorPaneProps) => {
    const { t } = useTranslation<BaseTranslations, TranslationKey>();

    const action = createMediaAction;

    return (
        <Pane<CreateMediaActionState>
            initialState={{
                type: FormActionStateType.INITIAL
            }}
            SubmitButtonIcon={CheckmarkBadge02Icon}
            action={action}
            cancelButtonText={t("custom:window:pane:media_creator:footer:cancel")}
            pane={PaneEnum.MEDIA_CREATOR}
            paneId={paneId}
            paneState={paneState}
            resetOnClose={true}
            submitButtonText={t("custom:window:pane:media_creator:footer:save")}
            title={t("custom:window:pane:media_creator:title")}
            type={PaneComponentType.FORM}
        >
            {MediaCreator}
        </Pane>
    );
};
