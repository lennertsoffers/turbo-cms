"use client";

import { ComponentComponent } from "./component.component";

type ComponentProps = {
    name: string;
    Icon: JSX.Element;
};

export const Component = ({
    name,
    Icon
}: ComponentProps) => {
    return (
        <ComponentComponent
            Icon={Icon}
            name={name}
        />
    );
};
