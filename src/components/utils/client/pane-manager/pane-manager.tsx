"use client";

import {
    useEffect,
    useState
} from "react";

import { PaneState } from "@/config/panes/enums/pane-state-enum";
import { PaneTypeEnum } from "@/config/panes/enums/pane-type.enum";
import { useEventService } from "@/hooks/service/use-event-service.hook";
import { PaneCloseEvent } from "@/services/client/event/models/pane-close.event";
import { PaneOpenEvent } from "@/services/client/event/models/pane-open.event";
import { PaneOpenedEvent } from "@/services/client/event/models/pane-opened.event";
import { Event } from "@/services/client/event/types/event.enum";
import * as PaneService from "@/services/client/pane/pane.service";

import { PaneStateRecord } from "../../../../services/client/pane/types/pane-state-record.types";
import { PanesState } from "../../../../services/client/pane/types/panes-state.types";

import { ComponentsConfig } from "./config/components.config";

type PaneManagerProps = {};

export const PaneManager = ({}: PaneManagerProps) => {
    const [
        panes,
        setPanes
    ] = useState<PanesState>({});

    useEffect(
        () => {
            setPanes(PaneService.getState());
        },
        [ setPanes ]
    );

    const handlePaneOpenEvent = (event: PaneOpenEvent<PaneTypeEnum>) => {
        console.debug(
            "PaneManager - Open pane:\n",
            event
        );

        const newPaneId = crypto.randomUUID();

        const currentPanesState = PaneService.getState();

        const paneStateRecord: PaneStateRecord = {
            id: newPaneId,
            pane: event.pane,
            props: event.props,
            state: PaneState.OPENING,
            childId: null,
            parentId: event.parentId
        };

        const panesState = PaneService.addPaneStateRecord(currentPanesState)(paneStateRecord);

        PaneService.saveState(panesState);
        setPanes(panesState);
    };

    const handlePaneOpenedEvent = (event: PaneOpenedEvent) => {
        console.debug(
            "PaneManager - Opened pane:\n",
            event
        );

        const currentPanesState = PaneService.getState();

        const panesState = PaneService.updatePaneStateRecord(currentPanesState)(
            event.id,
            {
                state: PaneState.OPEN
            }
        );

        PaneService.saveState(panesState);
        setPanes(panesState);
    };

    const handlePaneCloseEvent = (event: PaneCloseEvent) => {
        console.debug(
            "PaneManager - Close pane:\n",
            event
        );

        const paneId = event.id;
        const currentPanesState = PaneService.getState();

        const closedPaneIds = PaneService.getChildIds(currentPanesState)(paneId);

        const panesState = closedPaneIds.reduce<PanesState>(
            (panesState, id) => PaneService.updatePaneStateRecord(panesState)(
                id,
                {
                    state: PaneState.CLOSING
                }
            ),
            currentPanesState
        );

        PaneService.saveState(panesState);
        setPanes(panesState);
    };

    const handlePaneClosedEvent = (event: PaneCloseEvent) => {
        console.debug(
            "PaneManager - Closed pane:\n",
            event
        );

        const currentPanesState = PaneService.getState();
        const currentPaneStateRecords = PaneService.destructState(currentPanesState);

        const paneStateRecords = currentPaneStateRecords.filter(({ id }) => id !== event.id);
        const panesState = PaneService.buildState(paneStateRecords);

        PaneService.saveState(panesState);
        setPanes(panesState);
    };

    const handlePaneCloseAllEvent = () => {
        console.debug("PaneManager - Close all panes");

        const currentPanesState = PaneService.getState();
        const currentPaneStateRecords = PaneService.destructState(currentPanesState);

        const paneStateRecords = currentPaneStateRecords.map((paneStateRecord) => ({
            ...paneStateRecord,
            state: PaneState.CLOSING
        }));
        const panesState = PaneService.buildState(paneStateRecords);

        PaneService.saveState(panesState);
        setPanes(panesState);
    };

    useEventService({
        [Event.PANE_OPEN]: handlePaneOpenEvent,
        [Event.PANE_OPENED]: handlePaneOpenedEvent,
        [Event.PANE_CLOSE]: handlePaneCloseEvent,
        [Event.PANE_CLOSED]: handlePaneClosedEvent,
        [Event.PANE_CLOSE_ALL]: handlePaneCloseAllEvent
    });

    const renderPanesData = PaneService.destructState(panes)
        .map((pane) => {
            const PaneComponent = ComponentsConfig[pane.pane];
            const props = pane.props as typeof PaneComponent extends (
                props: infer P
            ) => any ? P : never;

            return {
                PaneComponent: PaneComponent,
                props: props,
                pane: pane
            };
        });

    return (
        <div className={"pane-container"}>
            {renderPanesData.map(({ PaneComponent, props, pane }) => (
                <PaneComponent
                    key={pane.id}
                    {...props}
                    paneId={pane.id}
                    paneState={pane.state}
                />
            ))}
        </div>
    );
};
