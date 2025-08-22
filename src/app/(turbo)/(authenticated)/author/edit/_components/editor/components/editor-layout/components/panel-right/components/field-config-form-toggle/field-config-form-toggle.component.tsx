"use client";

import * as Tooltip from "@radix-ui/react-tooltip";
import { MouseEventHandler } from "react";

import { IconComponent } from "@turbo-cms/types-components/components/icon";

import styles from "./field-config-form-toggle.module.scss";

type FieldConfigFormToggleComponentProps = {
    tooltip: string;
    onMoreClick: MouseEventHandler;
    Icon: IconComponent;
};

export const FieldConfigFormToggleComponent = ({
    tooltip,
    onMoreClick,
    Icon
}: FieldConfigFormToggleComponentProps) => {
    const handleOnMoreClick = onMoreClick;

    return (
        <Tooltip.Provider>
            <Tooltip.Root>
                <Tooltip.Trigger asChild={true}>
                    <button
                        className={styles["field-config-form-toggle"]}
                        onClick={handleOnMoreClick}
                    >
                        <Icon className={styles["field-config-form-toggle__icon"]} />
                    </button>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                    <Tooltip.Content
                        className={styles["field-config-form-toggle__tooltip"]}
                        sideOffset={5}
                    >
                        {tooltip}
                        <Tooltip.Arrow className={styles["field-config-form-toggle__tooltip__arrow"]} />
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>
        </Tooltip.Provider>
    );
};
