"use client";

import { ReactNode } from "react";

import { PaneTypeEnum } from "@/config/panes/enums/pane-type.enum";
import { usePane } from "@/hooks/window/use-pane-OLD.hook";

type PaneActionProps = {
    pane: PaneTypeEnum;
    className?: string;
    children: ReactNode;
};

export const PaneAction = ({
    pane,
    className,
    children
}: PaneActionProps) => {
    const { openPane } = usePane();

    const handleOnClick = () => openPane(pane);

    return (
        <button
            className={className}
            onClick={handleOnClick}
        >
            {children}
        </button>
    );
};
