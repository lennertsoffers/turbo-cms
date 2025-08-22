"use client";

import { PropsWithChildren } from "react";

import { DragOverlayComponent } from "./drag-overlay.component";

type DragOverlayProps = PropsWithChildren<{}>;

export const DragOverlay = ({ children }: DragOverlayProps) => {
    return (
        <DragOverlayComponent>
            {children}
        </DragOverlayComponent>
    );
};
