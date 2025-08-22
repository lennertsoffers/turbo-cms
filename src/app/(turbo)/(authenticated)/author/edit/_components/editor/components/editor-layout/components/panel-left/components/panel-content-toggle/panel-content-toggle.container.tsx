"use client";

import { PanelLeftContentTypeEnum } from "../../enums/panel-left-content-type.enum";

import { PanelContentToggleComponent } from "./panel-content-toggle.component";

type PanelContentToggleProps = {
    onSelect: (value: PanelLeftContentTypeEnum) => void;
};

export const PanelContentToggle = ({ onSelect }: PanelContentToggleProps) => {
    return <PanelContentToggleComponent onSelect={onSelect} />;
};
