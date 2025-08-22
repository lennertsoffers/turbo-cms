"use client";

import { DragOverlay } from "@dnd-kit/core";
import { PropsWithChildren } from "react";

import { dropAnimation } from "./drag-overlay.config";

type DragOverlayComponentProps = PropsWithChildren<{}>;

export const DragOverlayComponent = ({ children }: DragOverlayComponentProps) => {
    return (
        <DragOverlay
            adjustScale={false}
            dropAnimation={dropAnimation}
        >
            {children}
        </DragOverlay>
    );
};
