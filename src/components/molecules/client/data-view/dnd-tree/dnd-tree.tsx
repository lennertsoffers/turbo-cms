"use client";

import {
    closestCenter,
    DndContext,
    DragEndEvent,
    DragMoveEvent,
    DragStartEvent,
    Modifiers,
    PointerSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import {
    FC,
    useState
} from "react";

import {
    ElementProjection,
    FlatTreeElement,
    TreeElement
} from "@/types/components/dnd/element.types";
import { Id } from "@/types/domain/id.types";
import { extracting } from "@/utils/general/array.utils";
import { isDefined } from "@/utils/general/object.utils";

import { DndConfig } from "./configs/dnd.config";
import { DndTreeComponent } from "./dnd-tree.component";
import {
    createGetDepth,
    toggleElementId
} from "./helpers/element.helpers";
import {
    equalsId,
    isVisible
} from "./helpers/filter.helpers";
import {
    buildTree,
    flattenElements,
    getProjection,
    moveElement
} from "./helpers/tree.helpers";

type DndTreeProps<T extends { id: Id; }> = {
    tree: TreeElement<T>[];
    selection: T | null;
    dragOffset: number;
    className?: string;
    Element: FC<{
        element: T;
        className?: string;
    }>;
    setTree: (tree: TreeElement<T>[]) => void;
    setSelection: (selection: T | null) => void;
};

export const DndTree = <T extends { id: Id; }>({
    tree,
    selection,
    dragOffset,
    className,
    Element,
    setTree,
    setSelection
}: DndTreeProps<T>) => {
    const [
        collapsedElementIds,
        setCollapsedElementIds
    ] = useState<Id[]>([]);

    const [
        activeElement,
        setActiveElement
    ] = useState<FlatTreeElement<T> | undefined>(undefined);

    const [
        projection,
        setProjection
    ] = useState<ElementProjection<T> | undefined>(undefined);

    const sensors = useSensors(
        useSensor(
            PointerSensor,
            DndConfig.pointerSensorOptions
        )
    );

    const flatElements = flattenElements(
        tree,
        collapsedElementIds,
        activeElement?.id
    );

    const visibleElements = flatElements.filter(isVisible);
    const visibleElementIds = visibleElements.map(extracting("id"));

    const updateProjection = (activeId: Id, overId: Id, depth: number) => {
        const newProjection = getProjection(
            visibleElements,
            activeId,
            overId,
            depth
        );

        if(newProjection.depth !== projection?.depth) {
            setProjection(newProjection);
        }
    };

    const handleOnDragStart = ({ active }: DragStartEvent) => {
        const element = flatElements.find(equalsId(active.id));

        setSelection(null);

        updateProjection(
            active.id,
            active.id,
            0
        );
        setActiveElement(element);
    };

    const handleOnDragMove = ({ active, over, delta }: DragMoveEvent) => {
        if(!isDefined(over)) return;

        updateProjection(
            active.id,
            over.id,
            Math.round(delta.x / dragOffset)
        );
    };

    const handleOnDragEnd = ({ active, over }: DragEndEvent) => {
        if(!isDefined(projection)) return;
        if(!isDefined(over)) return;

        const activeElement = flatElements.find(equalsId(active.id));
        const overElement = flatElements.find(equalsId(over.id));

        if(!isDefined(activeElement)) return;
        if(!isDefined(overElement)) return;
        if(!isDefined(activeElement.index)) return;
        if(!isDefined(overElement.index)) return;

        const elements = flatElements.map((flat) => ({
            ...flat,
            children: []
        }));

        const newFlatElements = moveElement(
            elements,
            activeElement,
            overElement,
            projection
        );
        const newTree = buildTree(newFlatElements);

        setTree(newTree);
        setActiveElement(undefined);
    };

    const handleOnDragCancel = () => {
        setActiveElement(undefined);
    };

    const handleOnSelect = setSelection;

    const handleOnToggleOpen = (element: FlatTreeElement<T>) => setCollapsedElementIds(
        toggleElementId(element)
    );

    const handleOnDropAnimationCleanup = () => setProjection(undefined);

    const dragOverlayModifiers: Modifiers = [
        ({ transform }) => ({
            ...transform,
            x: transform.x + ((activeElement?.depth ?? 0) * dragOffset)
        })
    ];

    const getDepth = createGetDepth(
        activeElement,
        projection
    );

    return (
        <DndContext
            collisionDetection={closestCenter}
            sensors={sensors}
            onDragCancel={handleOnDragCancel}
            onDragEnd={handleOnDragEnd}
            onDragMove={handleOnDragMove}
            onDragStart={handleOnDragStart}
        >
            <DndTreeComponent
                Element={Element}
                activeElement={activeElement}
                className={className}
                dragOffset={dragOffset}
                dragOverlayModifiers={dragOverlayModifiers}
                elementIds={visibleElementIds}
                elements={visibleElements}
                getDepth={getDepth}
                projection={projection}
                selection={selection}
                onDropAnimationCleanup={handleOnDropAnimationCleanup}
                onSelect={handleOnSelect}
                onToggleOpen={handleOnToggleOpen}
            />
        </DndContext>
    );
};
