import { useEffect } from "react";

import {
    PaneState,
    PaneStateEnum
} from "@/config/panes/enums/pane-state-enum";

type UsePaneStateCallbacksProps = {
    paneState: PaneStateEnum;
    onOpenStart?: () => void;
    onCloseStart?: () => void;
    onOpenEnd?: () => void;
    onCloseEnd?: () => void;
};

export const usePaneStateCallbacks = ({
    paneState,
    onOpenStart,
    onCloseStart,
    onOpenEnd,
    onCloseEnd
}: UsePaneStateCallbacksProps) => {
    useEffect(
        () => {
            ({
                [PaneState.OPENING]: onOpenStart,
                [PaneState.CLOSING]: onCloseStart,
                [PaneState.OPEN]: onOpenEnd,
                [PaneState.CLOSED]: onCloseEnd
            })[paneState]?.();
        },
        [
            paneState,
            onCloseEnd,
            onCloseStart,
            onOpenEnd,
            onOpenStart
        ]
    );
};
