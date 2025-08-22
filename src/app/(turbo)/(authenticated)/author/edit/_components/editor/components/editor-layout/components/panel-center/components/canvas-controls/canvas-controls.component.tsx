"use client";

import {
    ComputerIcon,
    SearchAddIcon,
    SearchMinusIcon,
    SmartPhone01Icon,
    Tablet01Icon
} from "hugeicons-react";

import { IconButton } from "@turbo-cms/components-general/shared/button/icon-button";
import {
    CanvasDeviceType,
    CanvasDeviceTypeEnum
} from "@turbo-cms/store/author";

import styles from "./canvas-controls.module.scss";

type CanvasControlsComponentProps = {
    createSetDevice: (device: CanvasDeviceTypeEnum) => () => void;
    onIncreaseZoom: () => void;
    onDecreaseZoom: () => void;
    zoom: number;
};

export const CanvasControlsComponent = ({
    createSetDevice,
    onIncreaseZoom,
    onDecreaseZoom,
    zoom
}: CanvasControlsComponentProps) => {
    const handleOnIncreaseZoomClick = onIncreaseZoom;
    const handleOnDecreaseZoomClick = onDecreaseZoom;

    return (
        <ul className={styles["canvas-controls"]}>
            <li className={styles["canvas-controls__device"]}>
                <ul>
                    <li>
                        <IconButton
                            Icon={SmartPhone01Icon}
                            color={"primary"}
                            size={"sm"}
                            title={""}
                            onClick={createSetDevice(CanvasDeviceType.MOBILE)}
                        />
                    </li>
                    <li>
                        <IconButton
                            Icon={Tablet01Icon}
                            color={"primary"}
                            size={"sm"}
                            title={""}
                            onClick={createSetDevice(CanvasDeviceType.TABLET)}
                        />
                    </li>
                    <li>
                        <IconButton
                            Icon={ComputerIcon}
                            color={"primary"}
                            size={"sm"}
                            title={""}
                            onClick={createSetDevice(CanvasDeviceType.DESKTOP)}
                        />
                    </li>
                </ul>
            </li>
            <li className={styles["canvas-controls__zoom"]}>
                <ul>
                    <li>
                        <IconButton
                            Icon={SearchAddIcon}
                            color={"primary"}
                            size={"sm"}
                            title={""}
                            onClick={handleOnIncreaseZoomClick}
                        />
                    </li>
                    <li>
                        <IconButton
                            Icon={SearchMinusIcon}
                            color={"primary"}
                            size={"sm"}
                            title={""}
                            onClick={handleOnDecreaseZoomClick}
                        />
                    </li>
                </ul>
            </li>
            <li className={styles["canvas-controls__percent"]}>
                {zoom}
                {" "}
                {"%"}
            </li>
        </ul>
    );
};
