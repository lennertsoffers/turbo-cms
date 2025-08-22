import { DragCancelEvent } from "@dnd-kit/core";
import {
    RefObject,
    useCallback
} from "react";

import { ComponentModel } from "@turbo-cms/core/types/config/components/component.model";
import {
    AuthorSelectors,
    useAuthorStore
} from "@turbo-cms/store/author";
import { isDefined } from "@turbo-cms/utils-general/object";

type UseHandleOnDragCancelProps = {
    copyComponentRef: RefObject<ComponentModel | undefined>;
};

export const useHandleOnDragCancel = ({ copyComponentRef }: UseHandleOnDragCancelProps) => {
    const dragCancel = useAuthorStore(AuthorSelectors.dragCancel);

    return useCallback(
        (_event: DragCancelEvent) => {
            if(!isDefined(copyComponentRef.current)) return;
            dragCancel({
                resetComponent: copyComponentRef.current
            });
        },
        [
            copyComponentRef,
            dragCancel
        ]
    );
};
