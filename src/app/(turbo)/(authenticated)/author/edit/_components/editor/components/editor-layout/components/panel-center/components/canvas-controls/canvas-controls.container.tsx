"use client";

import {
    AuthorSelectors,
    CanvasDeviceTypeEnum,
    useAuthorStore
} from "@turbo-cms/store/author";

import {
    DEFAULT_ZOOM,
    MAX_ZOOM
} from "../../../../editor-layout.config";

import { CanvasControlsComponent } from "./canvas-controls.component";

type CanvasControlsProps = {};

export const CanvasControls = ({}: CanvasControlsProps) => {
    const zoom = useAuthorStore(AuthorSelectors.getZoom) ?? DEFAULT_ZOOM;
    const setZoom = useAuthorStore(AuthorSelectors.setZoom);
    const setDeviceType = useAuthorStore(AuthorSelectors.setDeviceType);

    const createSetDevice =
        (device: CanvasDeviceTypeEnum) =>
        () => setDeviceType(device);

    const handleOnIncreaseZoom = () => setZoom(
        Math.min(
            zoom < 100
                ? zoom + 25
                : zoom + 100,
            MAX_ZOOM
        )
    );

    const handleOnDecreaseZoom = () => setZoom(
        Math.max(
            zoom <= 100
                ? zoom - 25
                : zoom - 100,
            MAX_ZOOM
        )
    );

    return (
        <CanvasControlsComponent
            createSetDevice={createSetDevice}
            zoom={zoom}
            onDecreaseZoom={handleOnDecreaseZoom}
            onIncreaseZoom={handleOnIncreaseZoom}
        />
    );
};
