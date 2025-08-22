import {
    createContext,
    PropsWithChildren,
    RefObject,
    useContext,
    useRef
} from "react";

import { isDefined } from "@/utils/general/object.utils";

export type InputFieldContextValue = {
    inputRef: RefObject<HTMLElement | null>;
};

const InputFieldContext = createContext<InputFieldContextValue | undefined>(
    undefined
);

export const InputFieldContextProvider = ({ children }: PropsWithChildren) => {
    const inputRef = useRef<HTMLElement | null>(null);

    return (
        <InputFieldContext value={{
            inputRef: inputRef
        }}
        >
            {children}
        </InputFieldContext>
    );
};

export const useInputFieldContext = () => {
    const context = useContext(InputFieldContext);

    if(!isDefined(context)) {
        throw new Error(
            "useInputFieldContext can only be used inside a InputFieldContext"
        );
    }

    return context;
};
