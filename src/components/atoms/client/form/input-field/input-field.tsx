import { ComponentProps } from "react";

import { InputFieldInput } from "./components/input/input";
import { InputFieldRoot } from "./components/root/root";
import { InputFieldContextProvider } from "./context/input-field.context";

export const Root = ({
    className,
    children
}: ComponentProps<typeof InputFieldRoot>) => (
    <InputFieldContextProvider>
        <InputFieldRoot className={className}>
            {children}
        </InputFieldRoot>
    </InputFieldContextProvider>
);

const Input = InputFieldInput;

export const InputField = {
    Root: Root,
    Input: Input
};
