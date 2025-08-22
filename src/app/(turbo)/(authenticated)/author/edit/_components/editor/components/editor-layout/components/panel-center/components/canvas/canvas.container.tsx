"use client";

import { MouseEventHandler } from "react";

import {
    AuthorSelectors,
    useAuthorStore
} from "@turbo-cms/store/author";
import { isDefined } from "@turbo-cms/utils-general/object";

import { findParentById } from "../../../../../../helpers/component.helpers";
import { DEVICE_TYPE_TO_WIDTH_MAP } from "../../../../editor-layout.config";

import { CanvasComponent } from "./canvas.component";

type CanvasProps = {};

export const Canvas = ({}: CanvasProps) => {
    const component = useAuthorStore(AuthorSelectors.getComponent);
    const activeComponent = useAuthorStore(AuthorSelectors.getActiveComponent);
    const deviceType = useAuthorStore(AuthorSelectors.getDeviceType);

    const changeHover = useAuthorStore(AuthorSelectors.changeHover);

    const width = DEVICE_TYPE_TO_WIDTH_MAP[deviceType];

    const clearHover = () => changeHover({
        id: undefined,
        parentId: undefined
    });

    const handleOnMouseOver: MouseEventHandler = (event) => {
        if(isDefined(activeComponent)) return clearHover();

        if(!isDefined(component)) return clearHover();
        if(!(event.target instanceof HTMLElement)) return clearHover();

        const element = event.target.closest("[data-author-component-id]");
        if(!isDefined(element)) return clearHover();
        if(!(element instanceof HTMLElement)) return clearHover();

        const hoveredComponentId = element.dataset["authorComponentId"];
        if(!isDefined(hoveredComponentId)) return clearHover();

        const hoveredParentId = findParentById(component)(hoveredComponentId)?.id;

        return changeHover({
            id: hoveredComponentId,
            parentId: hoveredParentId
        });
    };

    if(!isDefined(component)) return null;

    return (
        <CanvasComponent
            activeComponent={activeComponent}
            component={component}
            width={width}
            onMouseOver={handleOnMouseOver}
        />
    );
};
