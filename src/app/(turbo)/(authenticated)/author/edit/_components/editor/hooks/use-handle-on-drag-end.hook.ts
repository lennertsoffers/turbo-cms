import { DragEndEvent } from "@dnd-kit/core";
import { useCallback } from "react";

import { ComponentModel } from "@turbo-cms/core/types/config/components/component.model";
import {
    AuthorSelectors,
    useAuthorStore
} from "@turbo-cms/store/author";
import { Id } from "@turbo-cms/types-models/id.types";
import { extracting } from "@turbo-cms/utils-general/array";
import { isDefined } from "@turbo-cms/utils-general/object";

import { NEW_COMPONENT_ID_PREFIX } from "../../../config";
import {
    appendAtId,
    insertAtId,
    isNewPlaceholder,
    removeById
} from "../helpers/component.helpers";
import { getDndType } from "../helpers/dnd-type.helpers";
import { DndType } from "../types/enums/dnd-type.enum";
import { InsertStrategy } from "../types/enums/insert-strategy.enum";

type GetNewComponentBySwitching = (props: {
    activeParent?: ComponentModel;
    activeComponent?: ComponentModel;
    overId: Id;
    component: ComponentModel;
}) => ComponentModel;
const getNewComponentBySwitching: GetNewComponentBySwitching = ({
    activeParent,
    activeComponent,
    overId,
    component
}) => {
    if(!isDefined(activeComponent)) return component;
    if(!isDefined(activeParent)) return component;

    const order = activeParent.children.map(extracting("id"));
    const overIdOrder = order.indexOf(overId);
    const activeIdOrder = order.indexOf(activeComponent.id);

    const location =
        overIdOrder < activeIdOrder
            ? InsertStrategy.BEFORE
            : InsertStrategy.AFTER;

    return insertAtId(
        component,
        activeComponent,
        location
    )(overId);
};

type GetNewComponentByNesting = (props: {
    activeComponent?: ComponentModel;
    overId: Id;
    component: ComponentModel;
}) => ComponentModel;
const getNewComponentByNesting: GetNewComponentByNesting = ({
    activeComponent,
    overId,
    component
}) => {
    if(!isDefined(activeComponent)) return component;

    return appendAtId(
        component,
        activeComponent
    )(overId);
};

export const useHandleOnDragEnd = () => {
    const component = useAuthorStore(AuthorSelectors.getComponent);
    const activeParent = useAuthorStore(AuthorSelectors.getActiveParent);
    const activeComponent = useAuthorStore(AuthorSelectors.getActiveComponent);
    const selectedComponent = useAuthorStore(AuthorSelectors.getSelectedComponent);

    const dragEnd = useAuthorStore(AuthorSelectors.dragEnd);

    const getCleanComponent = useCallback(
        () =>
            isDefined(component) && isDefined(activeComponent)
                ? removeById(component)(activeComponent.id)
                : component,
        [
            component,
            activeComponent
        ]
    );

    return useCallback(
        (event: DragEndEvent) => {
            if(!isDefined(component)) return;

            const overId = event.over?.id;
            const cleanComponent = getCleanComponent();

            if(
                !isDefined(overId)
                || !isDefined(cleanComponent)
                || (
                    !isDefined(activeComponent)
                    && !isDefined(selectedComponent)
                )
                || (
                    isDefined(activeComponent)
                    && overId === activeComponent.id
                )
            ) {
                dragEnd({
                    component: component
                });

                return;
            }

            const activeComponentCopy =
                isDefined(activeComponent) && isNewPlaceholder(activeComponent)
                    ? ({
                        ...activeComponent,
                        id: NEW_COMPONENT_ID_PREFIX + crypto.randomUUID()
                    })
                    : activeComponent;

            const dndType = getDndType(
                overId,
                activeComponentCopy,
                activeParent,
                selectedComponent
            );

            const newComponent =
                dndType === DndType.SWITCH
                    ? getNewComponentBySwitching({
                        activeParent: activeParent,
                        activeComponent: activeComponentCopy,
                        overId: overId,
                        component: cleanComponent
                    })
                    : getNewComponentByNesting({
                        activeComponent: activeComponentCopy,
                        overId: selectedComponent?.id ?? overId,
                        component: cleanComponent
                    });

            dragEnd({
                component: newComponent
            });
        },
        [
            activeParent,
            activeComponent,
            getCleanComponent
        ]
    );
};
