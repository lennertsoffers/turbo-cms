"use client";

import { useTranslation } from "@payloadcms/ui";

import { MenuTileType } from "@/components/atoms/client/navigation/menu-tile/enums/menu-tile-type.enum";
import { MenuTile } from "@/components/atoms/client/navigation/menu-tile/menu-tile";
import { PaneComponentType } from "@/components/utils/client/pane/enums/pane-component-type.enum";
import { Pane } from "@/components/utils/client/pane/pane";
import { BaseTranslations } from "@/config/i18n/translations.config";
import { TranslationKey } from "@/config/i18n/types/translation-keys.types";
import { Path } from "@/config/network/paths.config";
import { PaneType as PaneEnum } from "@/config/panes/enums/pane-type.enum";
import { PaneProps } from "@/config/panes/types/pane-props.types";
import { Page } from "@/config/payload/payload.types";
import { isDefined } from "@/utils/general/object.utils";

import styles from "./page-menu-pane.module.scss";

type PageMenuPaneProps = PaneProps<{
    page: Page;
}>;

export const PageMenuPane = ({
    paneId,
    paneState,
    page
}: PageMenuPaneProps) => {
    const { t } = useTranslation<BaseTranslations, TranslationKey>();

    if(!isDefined(page)) return null;

    return (
        <Pane
            className={styles["menu-pane"]}
            pane={PaneEnum.PAGE_MENU}
            paneId={paneId}
            paneState={paneState}
            resetOnClose={false}
            title={page.title}
            type={PaneComponentType.ASIDE}
        >
            <MenuTile
                description={t("custom:window:pane:page_menu:body:edit:description")}
                href={`${Path.AUTHOR_EDIT}?page-id=${page.id}`}
                title={t("custom:window:pane:page_menu:body:edit:description")}
                type={MenuTileType.LINK}
            />
            <MenuTile
                description={t("custom:window:pane:page_menu:body:preview:description")}
                href={`${Path.AUTHOR_PREVIEW}?page-id=${page.id}`}
                title={t("custom:window:pane:page_menu:body:preview:title")}
                type={MenuTileType.LINK}
            />
            <MenuTile
                description={t("custom:window:pane:page_menu:body:properties:description")}
                pane={PaneEnum.PAGE_EDITOR}
                title={t("custom:window:pane:page_menu:body:properties:title")}
                type={MenuTileType.PANE}
            />
            <MenuTile
                description={t("custom:window:pane:page_menu:body:on_off_times:description")}
                pane={PaneEnum.ON_OFF_TIMES}
                title={t("custom:window:pane:page_menu:body:on_off_times:title")}
                type={MenuTileType.PANE}
            />
            <MenuTile
                description={t("custom:window:pane:page_menu:body:create:description")}
                pane={PaneEnum.PAGE_CREATOR}
                title={t("custom:window:pane:page_menu:body:create:title")}
                type={MenuTileType.PANE}
            />
        </Pane>
    );
};
