
import { PaneTypeEnum } from "@/config/panes/enums/pane-type.enum";
import { PanePropsConfig } from "@/config/panes/pane-props.config";
import { BasePaneProps } from "@/config/panes/types/pane-props.types";
import * as EventService from "@/services/client/event/event.service";
import { PaneCloseEvent } from "@/services/client/event/models/pane-close.event";
import { PaneOpenEvent } from "@/services/client/event/models/pane-open.event";
import * as PaneService from "@/services/client/pane/pane.service";
import { Id } from "@/types/domain/id.types";

export const usePane = () => {
    const openPane = <TPaneType extends PaneTypeEnum>(
        pane: TPaneType,
        props: Omit<PanePropsConfig[TPaneType], keyof BasePaneProps>,
        parentId: Id | null
    ) => {
        EventService.dispatch(new PaneOpenEvent(
            pane,
            props,
            parentId
        ));
    };

    const closePane = (id: Id) => {
        EventService.dispatch(new PaneCloseEvent(id));
    };

    const getLevel = (id: Id) => PaneService.getParentIds(PaneService.getState())(id).length;

    const getLastPaneId = PaneService.getLastPaneId;

    return {
        openPane: openPane,
        closePane: closePane,
        getLevel: getLevel,
        getLastPaneId: getLastPaneId
    };
};
