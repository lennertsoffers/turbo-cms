import { entries } from "./object.utils";

type EventHandlerMapEntryConsumer<TEventHandlerMap> = <
    TEventName extends keyof TEventHandlerMap,
    THandler extends NonNullable<TEventHandlerMap[TEventName]>,
>(
    register: (name: TEventName, handler: THandler) => void
) => (entry: [TEventName, THandler]) => void;

const createEntryRegister =
    <TEventHandlerMap>(): EventHandlerMapEntryConsumer<TEventHandlerMap> =>
    (register) =>
    ([eventName, handler]) =>
        handler && register(eventName, handler);

const createEventHandlerMapSubscribers = <
    TEventHandlerMap extends object,
    TEventName extends keyof TEventHandlerMap,
    THandler extends NonNullable<TEventHandlerMap[TEventName]>,
>(
    on: (name: TEventName, handler: THandler) => void,
    off: (name: TEventName, handler: THandler) => void,
    map: TEventHandlerMap
) => {
    const sub = createEntryRegister<TEventHandlerMap>()(on);
    const unsub = createEntryRegister<TEventHandlerMap>()(off);
    const createCallbackForEachEntry =
        (apply: (entry: [TEventName, THandler]) => void) => () =>
            entries<TEventHandlerMap>(map).forEach(([key, value]) =>
                apply([key as TEventName, value as THandler])
            );

    return {
        subscribe: createCallbackForEachEntry(sub),
        unsubscribe: createCallbackForEachEntry(unsub),
    };
};

type CreateEventHandlerMapSubscribersParameters = Parameters<
    typeof createEventHandlerMapSubscribers
>;

export type OnRegistration = CreateEventHandlerMapSubscribersParameters[0];
export type OffRegistration = CreateEventHandlerMapSubscribersParameters[1];
export type EventHandlerMap = CreateEventHandlerMapSubscribersParameters[2];

export { createEventHandlerMapSubscribers };
