"use client";

import { useState } from "react";

import {
    PanelLeftContentType,
    PanelLeftContentTypeEnum
} from "./enums/panel-left-content-type.enum";
import { PanelLeftComponent } from "./panel-left.component";

type PanelLeftProps = {
    className?: string;
};

export const PanelLeft = ({ className }: PanelLeftProps) => {
    const [
        contentType,
        setContentType
    ] = useState<PanelLeftContentTypeEnum>(PanelLeftContentType.COMPONENTS);

    return (
        <PanelLeftComponent
            className={className}
            contentType={contentType}
            setContentType={setContentType}
        />
    );
};
