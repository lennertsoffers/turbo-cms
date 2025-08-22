"use client";

import * as RadixTooltip from "@radix-ui/react-tooltip";
import { ReactNode } from "react";

import styles from "./tooltip.module.scss";

type TooltipProps = {
    tooltip: ReactNode;
    children: ReactNode;
};

export const Tooltip = ({
    tooltip,
    children
}: TooltipProps) => {
    return (
        <RadixTooltip.Provider>
            <RadixTooltip.Root>
                <RadixTooltip.Trigger asChild={true}>
                    {children}
                </RadixTooltip.Trigger>
                <RadixTooltip.Portal>
                    <RadixTooltip.Content
                        className={styles["tooltip__content"]}
                        sideOffset={5}
                    >
                        {tooltip}
                        <RadixTooltip.Arrow className={styles["tooltip__arrow"]} />
                    </RadixTooltip.Content>
                </RadixTooltip.Portal>
            </RadixTooltip.Root>
        </RadixTooltip.Provider>
    );
};
