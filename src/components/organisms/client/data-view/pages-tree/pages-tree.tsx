"use client";

import { useState } from "react";

import { Button } from "@/components/atoms/shared/general/button/button";
import { ButtonVariant } from "@/components/atoms/shared/general/button/enums/button-variant.enum";
import { DndTree } from "@/components/molecules/client/data-view/dnd-tree/dnd-tree";
import { PaneType } from "@/config/panes/enums/pane-type.enum";
import { usePane } from "@/hooks/window/pane/use-pane.hook";
import { TreeElement } from "@/types/components/dnd/element.types";
import { FullPage } from "@/types/components/dnd/page.types";
import { isDefined } from "@/utils/general/object.utils";

import { PagesTreeElement } from "./components/pages-tree-element/pages-tree-element";

import styles from "./pages-tree.module.scss";

type PagesTreeProps = {
    pages: FullPage[];
};

export const PagesTree = ({ pages }: PagesTreeProps) => {
    const { openPane } = usePane();

    const [
        tree,
        setTree
    ] = useState<TreeElement<FullPage>[]>(pages);

    const [
        selection,
        setSelection
    ] = useState<FullPage | null>(null);

    // const handleOnCreatePageClick = () => openPane(Pane.PAGE_CREATOR);

    const handleOnEditPageClick = () => {
        if(!isDefined(selection)) return;

        openPane(
            PaneType.PAGE_EDITOR,
            {
                page: selection
            }
        );
    };

    return (
        <>
            <div className={styles["pages-tree__actions"]}>
                <Button
                    color={"primary"}
                    variant={ButtonVariant.OUTLINE}
                    // onClick={handleOnCreatePageClick}
                >
                    {/* // TODO - TK */}
                    {"Create page"}
                </Button>
                {isDefined(selection) && (
                    <Button
                        color={"primary"}
                        variant={ButtonVariant.OUTLINE}
                        onClick={handleOnEditPageClick}
                    >
                        {/* // TODO - TK */}
                        {"Edit page"}
                    </Button>
                )}
            </div>
            <DndTree<FullPage>
                Element={PagesTreeElement}
                dragOffset={32}
                selection={selection}
                setSelection={setSelection}
                setTree={setTree}
                tree={tree}
            />
        </>
    );
};
