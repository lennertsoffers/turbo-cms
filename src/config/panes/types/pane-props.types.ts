import { Id } from "@/types/domain/id.types";

import { PaneStateEnum } from "../enums/pane-state-enum";
import { PaneTypeEnum } from "../enums/pane-type.enum";

export type BasePaneProps = {
    pane: PaneTypeEnum;
    paneState: PaneStateEnum;
    paneId: Id;
};

export type PaneProps<TProps extends object> = Omit<BasePaneProps, "pane"> & Partial<TProps>;
