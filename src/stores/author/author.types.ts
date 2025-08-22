import { ComponentModel } from "@/types/components/component.model";
import { Id } from "@/types/domain/id.types";

import { CanvasDeviceTypeEnum } from "./enums/canvas-device-type.enum";
import { PanelTypeEnum } from "./enums/panel-type.enum";
import { Selections } from "./types/selection.types";

export type AuthorState = {
    selections?: Selections<ComponentModel>;

    deviceType: CanvasDeviceTypeEnum;
    zoom?: number;

    component?: ComponentModel;
    activeParent?: ComponentModel;
    activeComponent?: ComponentModel;
    overId?: Id;
    hoverId?: Id;
    hoverParentId?: Id;
};

export type AuthorActions = {
    setSelections: (selections: Selections<ComponentModel>) => void;

    active: PanelTypeEnum;
    setActive: (panelType: PanelTypeEnum) => void;

    setDeviceType: (width: CanvasDeviceTypeEnum) => void;
    setZoom: (zoom: number) => void;

    setComponent: (component: ComponentModel) => void;
    setActiveParent: (component: ComponentModel) => void;
    setActiveComponent: (component: ComponentModel) => void;
    setOverId: (id: Id) => void;
    setHoverId: (id: Id) => void;
    setHoverParentId: (id: Id) => void;

    dragStart: (props: {
        activeParent?: ComponentModel;
        activeComponent: ComponentModel;
        selectedComponent?: ComponentModel;
    }) => void;
    dragCancel: (props: { resetComponent: ComponentModel; }) => void;
    dragOver: (props: { overId?: Id; }) => void;
    dragEnd: (props: { component: ComponentModel; }) => void;
    changeHover: (props: {
        id: Id | undefined;
        parentId: Id | undefined;
    }) => void;
};

export type AuthorStore = AuthorActions & AuthorState;
