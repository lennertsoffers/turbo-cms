import { EventConfigMap } from "@/services/client/event/event.config";
import { useEventHandlers } from "@/utils/react/hooks/event-handlers.hook";

type EventName = keyof EventConfigMap;

export type EventHandlerConfigMap = Partial<{
    [TEvent in EventName]: (event: EventConfigMap[TEvent]) => Promise<void> | void;
}>;

export const useEventService = (eventHandlerMap: EventHandlerConfigMap) => {
    useEventHandlers(
        () => addEventListener,
        () => removeEventListener,
        eventHandlerMap
    );
};
