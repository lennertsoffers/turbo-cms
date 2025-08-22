import { useEventHandlers } from "./event-handlers.hook";

type EventName = keyof DocumentEventMap;

type DocumentEventHandlerMap = Partial<{
    [TEventName in EventName]: (event: DocumentEventMap[TEventName]) => void;
}>;

const useDocumentEventHandlers = (eventHandlerMap: DocumentEventHandlerMap) => {
    useEventHandlers(
        () => document?.addEventListener,
        () => document?.removeEventListener,
        eventHandlerMap
    );
};

export { useDocumentEventHandlers };
