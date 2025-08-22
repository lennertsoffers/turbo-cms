import {
    useCallback,
    useMemo,
    useState
} from "react";

import {
    ActionState,
    ActionStateEnum
} from "../types/enums/action-state.enum";

export const useActionState = (initialState: ActionStateEnum = ActionState.IDLE) => {
    const [
        actionState,
        setActionState
    ] = useState(initialState);

    const setter = useCallback(
        (state: ActionStateEnum) => () => setActionState(() => state),
        [ setActionState ]
    );

    const actions = useMemo(
        () => ({
            reset: setter(initialState),
            setPending: setter(ActionState.PENDING),
            setError: setter(ActionState.ERROR),
            setSuccess: setter(ActionState.SUCCESS)
        }),
        [
            initialState,
            setter
        ]
    );

    return {
        state: actionState,
        actions: actions
    };
};
