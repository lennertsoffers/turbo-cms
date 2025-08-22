"use client";

import classNames from "classnames";
import {
    AnimationEvent,
    ReactNode
} from "react";

import {
    PaneState,
    PaneStateEnum
} from "@/config/panes/enums/pane-state-enum";
import { BasePaneProps } from "@/config/panes/types/pane-props.types";
import { usePane } from "@/hooks/window/pane/use-pane.hook";
import * as EventService from "@/services/client/event/event.service";
import { PaneClosedEvent } from "@/services/client/event/models/pane-closed.event";
import { PaneOpenedEvent } from "@/services/client/event/models/pane-opened.event";

import { AsidePane } from "./components/aside-pane/aside-pane";
import { FormPane } from "./components/form-pane/form-pane";
import { PaneComponentType } from "./enums/pane-component-type.enum";
import { usePaneStateCallbacks } from "./hooks/use-pane-state-callbacks.hook";
import {
    AsidePaneProps,
    FormPaneProps
} from "./types/pane-props.types";

import styles from "./pane.module.scss";

const PaneStateToClassMap: Record<PaneStateEnum, string> = {
    [PaneState.OPENING]: "opening",
    [PaneState.OPEN]: "open",
    [PaneState.CLOSING]: "closing",
    [PaneState.CLOSED]: "closed"
};

type PaneProps<TState> = {
    title?: string;
    resetOnClose: boolean;
    headerButtons?: ReactNode[];
    footerButtons?: ReactNode[];
    className?: string;
    wrapperClassName?: string;
    onOpenStart?: () => void;
    onCloseStart?: () => void;
    onOpenEnd?: () => void;
    onCloseEnd?: () => void;
}& (AsidePaneProps | FormPaneProps<TState>) & BasePaneProps;

export const Pane = <TState extends object = never>({
    pane,
    paneState,
    paneId,
    title,
    headerButtons,
    footerButtons,
    className,
    wrapperClassName,
    onOpenStart,
    onCloseStart,
    onOpenEnd,
    onCloseEnd,
    ...props
}: PaneProps<TState>) => {
    const { getLevel, closePane } = usePane();

    usePaneStateCallbacks({
        paneState,
        onOpenStart,
        onCloseStart,
        onOpenEnd,
        onCloseEnd
    });

    const close = () => closePane(paneId);

    const handleOnOpenEnd = () => {
        EventService.dispatch(new PaneOpenedEvent(paneId));
        onOpenEnd?.();
    };

    const handleOnCloseEnd = () => {
        EventService.dispatch(new PaneClosedEvent(paneId));
        onCloseEnd?.();
    };

    const openStyle = styles[`pane--${PaneStateToClassMap[paneState]}`];

    const level = getLevel(paneId);

    const PaneStateToAnimationEnd: Partial<
        Record<
            PaneStateEnum,
            (event: AnimationEvent) => void
        >
    > = {
        [PaneState.OPENING]: handleOnOpenEnd,
        [PaneState.CLOSING]: handleOnCloseEnd
    };

    const paneProps = {
        id: pane,
        wrapperClassName: classNames(
            styles["pane"],
            openStyle,
            wrapperClassName
        ),
        className: classNames(
            styles["pane__content"],
            className
        ),
        style: {
            width: `calc(750px - ${level * 5}rem)`,
            zIndex: level + 1
        },
        onAnimationEnd: (event: AnimationEvent) =>
            PaneStateToAnimationEnd[paneState]?.(event)
    };

    return props.type === PaneComponentType.ASIDE
        ? (
            <AsidePane
                {...props}
                {...paneProps}
                close={close}
                footerButtons={footerButtons ?? []}
                headerButtons={headerButtons ?? []}
                title={title}
            >
                {props.children}
            </AsidePane>
        )
        : (
            <FormPane
                {...props}
                {...paneProps}
                close={close}
                footerButtons={footerButtons ?? []}
                headerButtons={headerButtons ?? []}
                title={title}
            >
                {props.children}
            </FormPane>
        );
};
