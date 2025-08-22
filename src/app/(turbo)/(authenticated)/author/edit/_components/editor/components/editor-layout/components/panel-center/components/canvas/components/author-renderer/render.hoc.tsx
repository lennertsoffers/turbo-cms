import { FC } from "react";

export const withRender = <TProps extends object>(Component: FC<TProps>) => {
    const Wrapped = (props: TProps) => <Component {...props} />;

    return Wrapped;
};
