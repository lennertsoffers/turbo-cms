"use client";

import { ComponentSelector } from "./components/component-selector/component-selector.container";
import { PageStructure } from "./components/page-structure/page-structure.container";
import { PanelContentToggle } from "./components/panel-content-toggle/panel-content-toggle.container";
import {
    PanelLeftContentType,
    PanelLeftContentTypeEnum
} from "./enums/panel-left-content-type.enum";

type PanelLeftComponentProps = {
    contentType: PanelLeftContentTypeEnum;
    setContentType: (contentType: PanelLeftContentTypeEnum) => void;
    className?: string;
};

export const PanelLeftComponent = ({
    className,
    contentType,
    setContentType
}: PanelLeftComponentProps) => {
    const handleOnSelect = setContentType;

    return (
        <div className={className}>
            <header>
                <h3 />
                <PanelContentToggle onSelect={handleOnSelect} />
            </header>
            {contentType === PanelLeftContentType.STRUCTURE && <PageStructure />}
            {contentType === PanelLeftContentType.COMPONENTS && <ComponentSelector />}
        </div>
    );
};
