import equal from "fast-deep-equal";
import { temporal } from "zundo";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { isDefined } from "@/utils/general/object.utils";

import { AuthorStore } from "./author.types";
import { CanvasDeviceType } from "./enums/canvas-device-type.enum";
import { PanelType } from "./enums/panel-type.enum";

function extractFunctions<T extends object>(obj: T): Partial<Record<keyof T, Function>> {
    const functions: Partial<Record<keyof T, Function>> = {};

    for (const key in obj) {
        if(typeof obj[key] === "function") {
            functions[key] = obj[key];
        }
    }

    return functions;
}

export const createAuthorStore = () => create<AuthorStore>()(
    devtools(
        temporal(
        (set) => ({
            selections: undefined,
            setSelections: (selections) => set((state) => ({
                ...state,
                selections: selections
            })),

            active: PanelType.CENTER,
            setActive: (panelType) => set((state) => ({
                ...state,
                active: panelType
            })),

            deviceType: CanvasDeviceType.DESKTOP,
            setDeviceType: (deviceType) => set((state) => ({
                ...state,
                deviceType: deviceType
            })),

            zoom: undefined,
            setZoom: (zoom) => set((state) => ({
                ...state,
                zoom: zoom
            })),

            component: undefined,
            setComponent: (component) => set((state) => ({
                ...state,
                component: component
            })),

            activeParent: undefined,
            setActiveParent: (component) => set((state) => ({
                ...state,
                activeParent: component
            })),

            activeComponent: undefined,
            setActiveComponent: (component) => set((state) => ({
                ...state,
                activeComponent: component
            })),

            overId: undefined,
            setOverId: (id) => set((state) => ({
                ...state,
                overId: id
            })),

            hoverId: undefined,
            setHoverId: (id) => set((state) => ({
                ...state,
                hoverId: id
            })),

            hoverParentId: undefined,
            setHoverParentId: (id) => set((state) => ({
                ...state,
                hoverParentId: id
            })),

            dragStart: ({
                activeParent,
                activeComponent,
                selectedComponent
            }) => set((state) => ({
                ...state,
                ...(isDefined(state.selections) && {
                    ranges: [],
                    lastSelection: selectedComponent
                }),
                activeParent: activeParent,
                activeComponent: activeComponent
            })),

            dragCancel: ({ resetComponent }) => set((state) => ({
                ...state,
                component: resetComponent,
                activeParent: undefined,
                activeComponent: undefined,
                overId: undefined
            })),
            dragOver: ({ overId }) => set((state) => ({
                ...state,
                overId: overId
            })),
            dragEnd: ({ component }) => set((state) => ({
                ...state,
                component: component,
                activeParent: undefined,
                activeComponent: undefined,
                overId: undefined
            })),

            changeHover: ({ id, parentId }) => set((state) => ({
                ...state,
                hoverId: id,
                hoverParentId: parentId
            }))
        }),
        {
            partialize: (state) => {
                const { selections, component } = state;

                return {
                    ...extractFunctions(state),
                    selections: selections,
                    component: component
                };
            },
            equality: (prev, curr) => equal(
                prev.component,
                curr.component
            )
            && equal(
                prev.selections?.lastSelection,
                curr.selections?.lastSelection
            ),
            limit: 100
        }
        )
    )
);
