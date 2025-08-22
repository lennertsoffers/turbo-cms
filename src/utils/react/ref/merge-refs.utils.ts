import {
    Ref,
    RefCallback
} from "react";

import { noop } from "@/utils/general/function.utils";
import { isDefined } from "@/utils/general/object.utils";

type RefToRefCallback = <TElement extends HTMLElement>(
    ref: Ref<TElement> | undefined
) => RefCallback<TElement>;

const refToRefCallback: RefToRefCallback = <TElement extends HTMLElement>(
    ref: Ref<TElement> | undefined
) => {
    if(!isDefined(ref)) return noop;

    return typeof ref === "function"
        ? ref
        : (node: TElement) => { ref.current = node; };
};

type MergeRefs = <TElement extends HTMLElement>(
    ...refs: (Ref<TElement> | undefined)[]
) => RefCallback<TElement>;

export const mergeRefs: MergeRefs = <TElement extends HTMLElement>(
    ...refs: (Ref<TElement> | undefined)[]
) => {
    if(refs.length === 0) {
        return noop;
    }

    if(refs.length === 1) {
        return refToRefCallback(refs[1]);
    }

    return refs.reduce<RefCallback<TElement>>(
        (acc, curr) => {
            if(!isDefined(curr)) return acc;

            return (node: TElement) => {
                acc(node);
                refToRefCallback(curr)(node);
            };
        },
        refToRefCallback(refs[1])
    );
};
