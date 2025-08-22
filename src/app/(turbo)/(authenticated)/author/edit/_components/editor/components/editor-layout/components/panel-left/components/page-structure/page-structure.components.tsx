"use client";

import {
    ElementTree,
    TreeElement
} from "@turbo-cms/components-general/client/data-view/element-tree";
import { ComponentModel } from "@turbo-cms/core/types/config/components/component.model";
import {
    AuthorSelectors,
    useAuthorStore
} from "@turbo-cms/store/author";
import { isDefined } from "@turbo-cms/utils-general/object";

import styles from "./page-structure.module.scss";

type PageStructureComponentProps = {};

export const PageStructureComponent = ({ }: PageStructureComponentProps) => {
    const component = useAuthorStore(AuthorSelectors.getComponent);
    const setComponent = useAuthorStore(AuthorSelectors.setComponent);
    const selections = useAuthorStore(AuthorSelectors.getSelections);
    const setSelections = useAuthorStore(AuthorSelectors.setSelections);

    const setTree = (tree: TreeElement<ComponentModel>[]) => {
        if(!isDefined(component)) return;

        setComponent({
            ...component,
            children: tree
        });
    };

    if(!isDefined(component)) return null;

    return (
        <ElementTree<ComponentModel>
            components={{
                Element: ({ element, className }) => (
                    <div
                        className={className}
                    >
                        {element.name}
                    </div>
                )
            }}
            selections={selections ?? {
                ranges: []
            }}
            className={styles["page-structure"]}
            dragOffset={32}
            setSelections={setSelections}
            setTree={setTree}
            tree={component.children}
        />
    );
};
