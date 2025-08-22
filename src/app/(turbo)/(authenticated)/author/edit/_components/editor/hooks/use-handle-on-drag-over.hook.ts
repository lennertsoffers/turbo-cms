import { DragOverEvent } from "@dnd-kit/core";
import { useCallback } from "react";

import {
    AuthorSelectors,
    useAuthorStore
} from "@turbo-cms/store/author";
import { isDefined } from "@turbo-cms/utils-general/object";

import { getDndType } from "../helpers/dnd-type.helpers";
import { DndType } from "../types/enums/dnd-type.enum";

export const useHandleOnDragOver = () => {
    const activeParent = useAuthorStore(AuthorSelectors.getActiveParent);
    const activeComponent = useAuthorStore(AuthorSelectors.getActiveComponent);
    const selectedComponent = useAuthorStore(AuthorSelectors.getSelectedComponent);

    const dragOver = useAuthorStore(AuthorSelectors.dragOver);

    return useCallback(
        (event: DragOverEvent) => {
            const overId = event.over?.id;
            if(!isDefined(overId)) return;

            const dndType = getDndType(
                overId,
                activeComponent,
                activeParent,
                selectedComponent
            );

            const nestOverId = dndType === DndType.SWITCH
                ? undefined
                : overId;

            dragOver({
                overId: nestOverId
            });
        },
        [
            activeParent,
            dragOver
        ]
    );
};
