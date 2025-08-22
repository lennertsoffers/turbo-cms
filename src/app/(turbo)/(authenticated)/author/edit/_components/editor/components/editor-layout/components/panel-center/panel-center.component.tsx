"use client";

import { CanvasControls } from "./components/canvas-controls/canvas-controls.container";
import { Canvas } from "./components/canvas/canvas.container";

type PanelCenterComponentProps = {};

export const PanelCenterComponent = ({}: PanelCenterComponentProps) => {
    return (
        <>
            <CanvasControls />
            <Canvas />
        </>
    );
};
