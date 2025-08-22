"use client";

import {
    useEffect,
    useState
} from "react";

import { IconComponent } from "@turbo-cms/types-components/components/icon";

import { FieldConfigFormToggleComponent } from "./field-config-form-toggle.component";

type FieldConfigFormToggleProps = {
    tooltip: string;
    onToggleMore: (more: boolean) => void;
    Icon: IconComponent;
};

export const FieldConfigFormToggle = ({
    tooltip,
    onToggleMore,
    Icon
}: FieldConfigFormToggleProps) => {
    const [
        more,
        setMore
    ] = useState<boolean>(false);

    useEffect(
        () => onToggleMore(more),
        [ more ]
    );

    const handleOnMoreClick = () => setMore((previousMore) => !previousMore);

    return (
        <FieldConfigFormToggleComponent
            Icon={Icon}
            tooltip={tooltip}
            onMoreClick={handleOnMoreClick}
        />
    );
};
