import { MediaCreatorPane } from "@/components/organisms/client/window/media-creator-pane/media-creator-pane";
import { MediaSelectorPane } from "@/components/organisms/client/window/media-selector-pane/media-selector-pane";
import { PageCreatorPane } from "@/components/organisms/client/window/page-creator-pane/page-creator-pane";
import { PageEditorPane } from "@/components/organisms/client/window/page-editor-pane/page-editor-pane";
import { PageMenuPane } from "@/components/organisms/client/window/page-menu-pane/page-menu-pane";
import { PaneType } from "@/config/panes/enums/pane-type.enum";

export const ComponentsConfig = {
    [PaneType.PAGE_MENU]: PageMenuPane,
    [PaneType.PAGE_CREATOR]: PageCreatorPane,
    [PaneType.PAGE_EDITOR]: PageEditorPane,
    [PaneType.MEDIA_SELECTOR]: MediaSelectorPane,
    [PaneType.MEDIA_CREATOR]: MediaCreatorPane,
    [PaneType.ON_OFF_TIMES]: MediaCreatorPane,
    [PaneType.VARIABLES_MENU]: MediaCreatorPane
} as const;
