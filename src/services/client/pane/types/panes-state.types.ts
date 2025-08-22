import { PaneTypeEnum } from "@/config/panes/enums/pane-type.enum";
import { Id } from "@/types/domain/id.types";

import { PaneStateRecord } from "./pane-state-record.types";

export type PanesState = Record<Id, PaneStateRecord<PaneTypeEnum>>;
