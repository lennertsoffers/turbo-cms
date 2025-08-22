import { EventConfigMap } from "./event.config";
import { EventEnum } from "./types/event.enum";

type Dispatch = (event: Event) => void;
export const dispatch: Dispatch = (event) => document.dispatchEvent(event);

type AddEventListener =
    <TEventEnum extends EventEnum>(type: TEventEnum) =>
    (listener: (event: EventConfigMap[TEventEnum]) => void) => void;
export const addEventListener: AddEventListener =
    (type) =>
    (listener) => {
        document.addEventListener(
            type,
            listener as EventListener
        );
    };

type RemoveEventListener =
    <TEventEnum extends EventEnum>(type: TEventEnum) =>
    (listener: (event: EventConfigMap[TEventEnum]) => void) => void;
export const removeEventListener: RemoveEventListener =
    (type) =>
    (listener) => {
        document.removeEventListener(
            type,
            listener as EventListener
        );
    };
