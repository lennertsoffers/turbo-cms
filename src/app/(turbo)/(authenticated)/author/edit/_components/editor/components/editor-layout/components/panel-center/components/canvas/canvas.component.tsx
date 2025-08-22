"use client";

import {
    MouseEventHandler,
    ReactNode,
    useMemo
} from "react";
import { createPortal } from "react-dom";

import { getComponentConfig } from "@turbo-cms/core/config/components/component-map.config";
import { ComponentModel } from "@turbo-cms/core/types/config/components/component.model";
import { isDefined } from "@turbo-cms/utils-general/object";
import { isClient } from "@turbo-cms/utils-nextjs/environment";

import { isNewPlaceholder } from "../../../../../../helpers/component.helpers";
import { Component } from "../../../panel-left/components/component-selector/components/component/component.container";

import { AuthorRenderer } from "./components/author-renderer/author-renderer.container";
import { DragOverlay } from "./components/drag-overlay/drag-overlay.container";

import styles from "./canvas.module.scss";

type CanvasComponentProps = {
    component: ComponentModel;
    activeComponent?: ComponentModel;
    width: number;
    onMouseOver: MouseEventHandler;
};

export const CanvasComponent = ({
    component,
    activeComponent,
    width,
    onMouseOver
}: CanvasComponentProps) => {
    const dragOverlay = useMemo(
        () => {
            if(!isClient()) return null;

            const Icon = getComponentConfig(activeComponent?.name ?? "")?.Icon;

            return createPortal(
                <DragOverlay>
                    {isDefined(activeComponent) && !isNewPlaceholder(activeComponent) && (
                        <AuthorRenderer
                            component={activeComponent}
                            overlay={true}
                        />
                    )}
                    {isDefined(activeComponent) && isNewPlaceholder(activeComponent) && (
                        <Component
                            Icon={Icon ?? <></>}
                            name={activeComponent.name}
                        />
                    )}
                </DragOverlay>,
                document.body
            );
        },
        [ activeComponent ]
    );

    const handleOnMouseOver = onMouseOver;

    return (
        <div
            className={styles["canvas"]}
            onMouseOver={handleOnMouseOver}
        >
            <div
                style={{
                    maxWidth: `${width}px`
                }}
                className={styles["canvas__content"]}
            >
                <AuthorRenderer
                    component={component}
                    key={component.id}
                />
                {dragOverlay as ReactNode}
            </div>
        </div>
    );
};
