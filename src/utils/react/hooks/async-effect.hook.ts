import {
    DependencyList,
    useEffect
} from "react";

const useAsyncEffect = (
    effect: () => Promise<void>,
    deps: DependencyList,
    cleanupFunction?: () => void
) =>
    useEffect(
() => {
    effect();

    return cleanupFunction;
},
[
    effect,
    cleanupFunction,
    ...deps
]
    );

export { useAsyncEffect };
