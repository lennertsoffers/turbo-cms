import { ComponentModel } from "@turbo-cms/core/types/config/components/component.model";
import { Id } from "@turbo-cms/types-models/id.types";
import { extracting } from "@turbo-cms/utils-general/array";
import { isDefined } from "@turbo-cms/utils-general/object";

import {
    DndType,
    DndTypeEnum
} from "../types/enums/dnd-type.enum";

import { isNewPlaceholder } from "./component.helpers";

type GetDndType = (
    overId: Id,
    activeComponent?: ComponentModel,
    activeParent?: ComponentModel,
    selectedComponent?: ComponentModel,
) => DndTypeEnum;
export const getDndType: GetDndType = (
    overId,
    activeComponent,
    activeParent,
    selectedComponent
) => {
    if(isDefined(activeComponent) && isNewPlaceholder(activeComponent)) {
        DndType.NEST;
    }

    if(isDefined(selectedComponent)) {
        return DndType.NEST;
    }

    const switchIds = [
        activeParent?.id,
        ...(activeParent?.children.map(extracting("id")) ?? [])
    ].filter(isDefined);

    return switchIds.includes(overId)
        ? DndType.SWITCH
        : DndType.NEST;
};
