"use client";

import { useTranslation } from "@payloadcms/ui";
import { CheckmarkBadge02Icon } from "hugeicons-react";

import { PaneComponentType } from "@/components/utils/client/pane/enums/pane-component-type.enum";
import { Pane } from "@/components/utils/client/pane/pane";
import { BaseTranslations } from "@/config/i18n/translations.config";
import { TranslationKey } from "@/config/i18n/types/translation-keys.types";
import { PaneType as PaneEnum } from "@/config/panes/enums/pane-type.enum";
import { PaneProps } from "@/config/panes/types/pane-props.types";
import { Page } from "@/config/payload/payload.types";
import { isDefined } from "@/utils/general/object.utils";

import {
    updatePageAction,
    UpdatePageActionState
} from "./actions/update-page.action";
import { PageEditor } from "./components/page-editor/page-editor";
import { createInitialState } from "./helpers/update-page-action.helpers";

type PageEditorPaneProps = PaneProps<{
    page: Page;
}>;

export const PageEditorPane = ({
    paneId,
    paneState,
    page
}: PageEditorPaneProps) => {
    const { t } = useTranslation<BaseTranslations, TranslationKey>();

    if(!isDefined(page)) return null;

    // TODO - Get page or optional props
    const initialState: UpdatePageActionState = createInitialState(page);

    return (
        <Pane<UpdatePageActionState>
            title={
                // TODO - TK
                "Edit page"
            }
            SubmitButtonIcon={CheckmarkBadge02Icon}
            action={updatePageAction}
            cancelButtonText={t("custom:window:pane:page_editor:footer:cancel")}
            footerButtons={[]}
            headerButtons={[]}
            initialState={initialState}
            pane={PaneEnum.PAGE_EDITOR}
            paneId={paneId}
            paneState={paneState}
            resetOnClose={false}
            submitButtonText={t("custom:window:pane:page_editor:footer:save")}
            type={PaneComponentType.FORM}
        >
            {PageEditor}
        </Pane>
    );
};
