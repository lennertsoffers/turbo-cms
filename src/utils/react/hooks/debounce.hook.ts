import {
    useCallback,
    useRef
} from "react";

import { isDefined } from "@/utils/general/object.utils";

type UseDebounce = (callback: () => void, delay: number) => () => void;
export const useDebounce: UseDebounce = (callback, delay) => {
    const timeoutRef = useRef<unknown | undefined>(undefined);

    return useCallback(
() => {
    if(isDefined(timeoutRef.current)) return;

    timeoutRef.current = setTimeout(
() => {
    timeoutRef.current = undefined;
    callback();
},
delay
    );
},
[ timeoutRef ]
    );
};
