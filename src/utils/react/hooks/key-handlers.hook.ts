import { isDefined } from "@/utils/general/object.utils";

import { KeyEnum } from "../types/enums/key.enum";

import { useDocumentEventHandlers } from "./document-event-handlers.hook";

type UseKeysHandler = (
    keyHandlerMap: Record<KeyEnum, (event: KeyboardEvent) => void>
) => void;
export const useKeysHandler: UseKeysHandler = (keyHandlerMap) => {
    const handleKeyDownEvent = (event: KeyboardEvent) => {
        const key = event.key as KeyEnum;

        const handler = keyHandlerMap[key];
        if(!isDefined(handler)) return;

        handler(event);
    };

    useDocumentEventHandlers({
        keydown: handleKeyDownEvent
    });
};
