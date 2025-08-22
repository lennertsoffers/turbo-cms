import { ComponentType, useCallback, useState } from "react";

type FunctionKeys<T> = keyof {
    [K in keyof T as T[K] extends (...args: any[]) => any ? K : never]: T[K];
};

export const withStateReset =
    <TProps extends object, TProp extends FunctionKeys<TProps>>(
        WrappedComponent: ComponentType<TProps>,
        propToWatch: TProp,
    ) =>
    (props: TProps) => {
        const [key, setKey] = useState<string>(crypto.randomUUID());

        const watchedProp = props[propToWatch];
        if (typeof watchedProp !== "function") {
            throw new Error(
                `The prop "${String(propToWatch)}" must be a function.`,
            );
        }

        const handleReset = useCallback(
            (...args: any[]) => {
                setKey(crypto.randomUUID());
                (props[propToWatch] as any)(...args);
            },
            [props, propToWatch],
        );

        return (
            <WrappedComponent
                key={key}
                {...{
                    ...props,
                    [propToWatch]: handleReset,
                }}
            />
        );
    };
