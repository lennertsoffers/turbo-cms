import { KeyboardEvent as SyntheticKeyboardEvent } from "react";

import { KeyEnum } from "@turbo-cms/types-models/keyboard/key.enum";
import { isDefined } from "@/utils/general/object.utils";

type KeyHandler<TKeyboardEvent extends KeyboardEvent | SyntheticKeyboardEvent> = {
    keys?: KeyEnum[];
    defaultExcept?: KeyEnum[];
    handler: (event: TKeyboardEvent) => void;
};

type CreateKeyHandler =
    <TKeyboardEvent extends KeyboardEvent | SyntheticKeyboardEvent>(
        keyHandlers: Array<KeyHandler<TKeyboardEvent>>,
    ) =>
    (event: TKeyboardEvent) => void;
export const createKeyHandler: CreateKeyHandler =
    (keyHandlers) =>
    (event) => {
        const pressedKey = event.key as KeyEnum;

        const shouldHandleKey = (
            { keys }: KeyHandler<any>
        ) => keys?.includes(pressedKey);

        const shouldHandleDefaultKey = (
            { defaultExcept }: KeyHandler<any>
        ) => isDefined(defaultExcept) && !defaultExcept.includes(pressedKey);

        const keyHandler = keyHandlers.find(shouldHandleKey)
          ?? keyHandlers.find(shouldHandleDefaultKey);

        keyHandler?.handler?.(event);
    };
