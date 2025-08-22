"use client";

import {
    AuthorSelectors,
    useAuthorStore
} from "@turbo-cms/store/author";

import { PanelRightComponent } from "./panel-right.component";

type PanelRightProps = {
    className?: string;
};

export const PanelRight = ({ className }: PanelRightProps) => {
    const selectedComponent = useAuthorStore(AuthorSelectors.getSelectedComponent);

    return (
        <PanelRightComponent
            className={className}
            selectedComponent={selectedComponent}
        />
    );
};
