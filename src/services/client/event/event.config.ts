
import { PaneTypeEnum } from "@/config/panes/enums/pane-type.enum";

import { MediaCreatedEvent } from "./models/media-created.event";
import { MediaSelectedEvent } from "./models/media-selected.event";
import { PageCreatedEvent } from "./models/page-created.event";
import { PageUpdatedEvent } from "./models/page-updated.event";
import { PaneCloseAllEvent } from "./models/pane-close-all.event";
import { PaneCloseEvent } from "./models/pane-close.event";
import { PaneOpenEvent } from "./models/pane-open.event";
import { PaneOpenedEvent } from "./models/pane-opened.event";
import { Event } from "./types/event.enum";

export type EventConfigMap = {
    [Event.PANE_OPEN]: PaneOpenEvent<PaneTypeEnum>;
    [Event.PANE_OPENED]: PaneOpenedEvent;
    [Event.PANE_CLOSE]: PaneCloseEvent;
    [Event.PANE_CLOSED]: PaneCloseEvent;
    [Event.PANE_CLOSE_ALL]: PaneCloseAllEvent;
    [Event.PAGE_CREATED]: PageCreatedEvent;
    [Event.PAGE_UPDATED]: PageUpdatedEvent;
    [Event.MEDIA_CREATED]: MediaCreatedEvent;
    [Event.MEDIA_SELECTED]: MediaSelectedEvent;
};
