"use client";

import { useEffect } from "react";

import {
    createEventHandlerMapSubscribers,
    EventHandlerMap,
    OffRegistration,
    OnRegistration
} from "@/utils/general/event-handler.utils";

const useEventHandlers = (
    on: () => OnRegistration,
    off: () => OffRegistration,
    eventHandlerMap: EventHandlerMap
) => {
    useEffect(
        () => {
            const { subscribe, unsubscribe } = createEventHandlerMapSubscribers(
                on(),
                off(),
                eventHandlerMap
            );

            subscribe();

            return unsubscribe;
        },
        [
            eventHandlerMap,
            off,
            on
        ]
    );
};

export { useEventHandlers };
