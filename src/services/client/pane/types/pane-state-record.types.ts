import { PaneStateEnum } from "@/config/panes/enums/pane-state-enum";
import { PaneTypeEnum } from "@/config/panes/enums/pane-type.enum";
import { PanePropsConfig } from "@/config/panes/pane-props.config";
import { BasePaneProps } from "@/config/panes/types/pane-props.types";
import { Id } from "@/types/domain/id.types";

export type PaneStateRecord<TPaneTypeEnum extends PaneTypeEnum = PaneTypeEnum> = {
    id: Id;
    pane: TPaneTypeEnum;
    props: Omit<PanePropsConfig[TPaneTypeEnum], keyof BasePaneProps>;
    state: PaneStateEnum;
    childId: Id | null;
    parentId: Id | null;
};
