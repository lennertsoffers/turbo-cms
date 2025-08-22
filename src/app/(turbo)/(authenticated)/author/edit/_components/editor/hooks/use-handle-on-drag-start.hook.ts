import { DragStartEvent } from "@dnd-kit/core";
import {
    RefObject,
    useCallback
} from "react";

import { getComponentConfig } from "@turbo-cms/core/config/components/component-map.config";
import { ComponentModel } from "@turbo-cms/core/types/config/components/component.model";
import {
    AuthorSelectors,
    useAuthorStore
} from "@turbo-cms/store/author";
import { isDefined } from "@turbo-cms/utils-general/object";

import { useAuthorContext } from "../../../_context/author.context";
import { NEW_COMPONENT_PLACEHOLDER_ID_PREFIX } from "../../../config";
import {
    findById,
    findParentById,
    isDroppable,
    isNewPlaceholder
} from "../helpers/component.helpers";

type UseHandleOnDragStartProps = {
    copyComponentRef: RefObject<ComponentModel | undefined>;
};

export const useHandleOnDragStart = ({ copyComponentRef }: UseHandleOnDragStartProps) => {
    const { componentMapConfig } = useAuthorContext();

    const component = useAuthorStore(AuthorSelectors.getComponent);
    const selectedComponent = useAuthorStore(AuthorSelectors.getSelectedComponent);

    const dragStart = useAuthorStore(AuthorSelectors.dragStart);

    const createNewActiveComponent = (activeId: string): ComponentModel | undefined => {
        const componentName = activeId.replace(
            NEW_COMPONENT_PLACEHOLDER_ID_PREFIX,
            ""
        );

        const componentConfig = getComponentConfig(componentName);
        if(!isDefined(componentConfig)) return;

        return {
            id: NEW_COMPONENT_PLACEHOLDER_ID_PREFIX + crypto.randomUUID(),
            children: [],
            name: componentName,
            props: componentConfig.defaultProps
        };
    };

    return useCallback(
        (event: DragStartEvent) => {
            if(!isDefined(component)) return;

            const activeId = event.active.id.toString();
            if(!isDefined(activeId)) return;

            const isNewComponent = isNewPlaceholder({
                id: activeId
            });

            copyComponentRef.current = component;

            const {
                activeComponent,
                parentComponent
            } = isNewComponent
                ? ({
                    activeComponent: createNewActiveComponent(activeId),
                    parentComponent: undefined
                })
                : ({
                    activeComponent: findById(component)(activeId),
                    parentComponent: findParentById(component)(activeId)
                });

            const newSelectedComponent =
                isDefined(selectedComponent)
                && isDroppable(componentMapConfig)(selectedComponent)
                    ? selectedComponent
                    : undefined;

            if(
                !isDefined(activeComponent)
                || (!isDefined(parentComponent) && !isNewComponent
                )
            ) {
                return;
            }

            dragStart({
                activeParent: parentComponent,
                activeComponent: activeComponent,
                selectedComponent: newSelectedComponent
            });
        },
        [
            component,
            dragStart,
            copyComponentRef,
            componentMapConfig,
            selectedComponent
        ]
    );
};
