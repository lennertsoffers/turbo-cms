import { Page } from "../payload/payload.types";

import { PaneType } from "./enums/pane-type.enum";
import { PaneProps } from "./types/pane-props.types";

export type PanePropsConfig = {
    [PaneType.PAGE_MENU]: PaneProps<{
        page: Page;
    }>;
    [PaneType.PAGE_CREATOR]: PaneProps<{}>;
    [PaneType.PAGE_EDITOR]: PaneProps<{
        page: Page;
    }>;
    [PaneType.MEDIA_SELECTOR]: PaneProps<{}>;
    [PaneType.MEDIA_CREATOR]: PaneProps<{}>;
    [PaneType.ON_OFF_TIMES]: PaneProps<{}>;
    [PaneType.VARIABLES_MENU]: PaneProps<{}>;
};
