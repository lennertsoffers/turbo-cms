import { arrayMove } from "@dnd-kit/sortable";

import {
    ElementProjection,
    FlatTreeElement,
    TreeElement
} from "@/types/components/dnd/element.types";
import { Id } from "@/types/domain/id.types";
import { isDefined } from "@/utils/general/object.utils";
import { bounded } from "@/utils/math/range.utils";

import { equalsId } from "./filter.helpers";

type FlattenElements = <T extends { id: Id; }>(
    elements: TreeElement<T>[],
    collapsedElementIds: Id[],
    activeElementId: Id | undefined,
    depth?: number,
    parentElement?: FlatTreeElement<T>,
    indexHolder?: { index: number; }
) => FlatTreeElement<T>[];

export const flattenElements: FlattenElements = <T extends { id: Id; }>(
    elements: TreeElement<T>[],
    collapsedElementIds: Id[],
    activeElementId: Id | undefined,
    depth: number = 0,
    parentElement?: FlatTreeElement<T>,
    indexHolder: { index: number; } = {
        index: 0
    }
) => {
    const flatElements: FlatTreeElement<T>[] = [];

    for (const element of elements) {
        const collapsed =
            collapsedElementIds.includes(element.id)
            || activeElementId === element.id;

        const flatElement: FlatTreeElement<T> = {
            ...element,
            index: indexHolder.index++,
            depth: depth,
            collapsed: collapsed,
            parent: parentElement,
            children: []
        };

        flatElements.push(flatElement);

        flatElement.children = flattenElements<T>(
            element.children ?? [],
            collapsedElementIds,
            activeElementId,
            depth + 1,
            flatElement,
            indexHolder
        );
        flatElements.push(...flatElement.children);
    }

    return flatElements;
};

type GetProjection = <T extends { id: Id; }>(
    flatElements: FlatTreeElement<T>[],
    activeElementId: Id,
    overElementId: Id,
    dragDepth: number
) => ElementProjection<T>;

export const getProjection: GetProjection = (
    flatElements,
    activeElementId,
    overElementId,
    dragDepth
) => {
    const activeElementIndex = flatElements.findIndex(equalsId(activeElementId));
    const overElementIndex = flatElements.findIndex(equalsId(overElementId));

    const projectedElements = arrayMove(
        flatElements,
        activeElementIndex,
        overElementIndex
    );

    const previousElement = projectedElements[overElementIndex - 1];

    const activeElementDepth = flatElements[activeElementIndex]?.depth ?? 0;
    const projectedDepth = activeElementDepth + dragDepth;

    const previousElementDepth = previousElement?.depth ?? -1;
    const nextElementDepth = projectedElements[overElementIndex + 1]?.depth ?? 0;

    const depth = bounded(
        projectedDepth,
        [
            nextElementDepth ?? 0,
            previousElementDepth + 1
        ]
    );

    const parent = isDefined(previousElement)
        ? previousElement.depth === depth
            ? previousElement.parent
            : previousElement
        : undefined;

    return {
        depth: depth,
        parent: parent
    };
};

type BuildTree = <T extends { id: Id; }>(
    flatElements: FlatTreeElement<T>[],
) => TreeElement<T>[];

export const buildTree: BuildTree = <T extends { id: Id; }>(flatElements: FlatTreeElement<T>[]) => {
    const tree: TreeElement<T>[] = [];
    const stack: {
        node: TreeElement<T>;
        depth: number;
    }[] = [];

    for (const flatElement of flatElements) {
        while (stack.length > 0 && stack.at(-1)!.depth >= flatElement.depth) {
            stack.pop();
        }

        const element = buildTreeElement(flatElement);

        if(stack.length === 0) {
            tree.push(element);
        } else {
            const parent = stack.at(-1)!;
            parent.node.children.push(element);
        }

        stack.push({
            node: element,
            depth: flatElement.depth
        });
    }

    return tree;
};

type BuildTreeElement = <T extends { id: Id; }>(
    flatElement: FlatTreeElement<T>
) => TreeElement<T>;

export const buildTreeElement: BuildTreeElement = <T extends { id: Id; }>({
    id,
    children: _children,
    collapsed: _collapsed,
    depth: _depth,
    index: _index,
    parent: _parent,
    ...rest
}: FlatTreeElement<T>) => ({
    id: id,
    children: [],
    ...rest
} as TreeElement<T>);

type CountChildren = <T extends { id: Id; }>(
    element: FlatTreeElement<T>,
    elements: FlatTreeElement<T>[]
) => number;

export const countChildren: CountChildren = (
    element,
    elements
) => {
    const elementIndex = elements.findIndex(equalsId(element.id));
    if(elementIndex === -1) return 0;

    const firstChildIndex = elementIndex + 1;

    const nextSiblingIndex = elements
        .slice(firstChildIndex)
        .findIndex(({ depth }) => depth <= element.depth);

    return nextSiblingIndex === -1
        ? elements.length - firstChildIndex
        : nextSiblingIndex;
};

type MoveElement = <T extends { id: Id; }>(
    elements: FlatTreeElement<T>[],
    elementToMove: FlatTreeElement<T>,
    toElement: FlatTreeElement<T>,
    projection: ElementProjection<T>
) => FlatTreeElement<T>[];

export const moveElement: MoveElement = (
    elements,
    elementToMove,
    toElement,
    projection
) => {
    const originalDepth = elementToMove.depth;

    const childCount = countChildren(
        elementToMove,
        elements
    );
    const movedCount = childCount + 1;

    elementToMove.depth = projection.depth;
    elementToMove.parent = projection.parent;

    const children = elements
        .slice(
            elementToMove.index + 1,
            elementToMove.index + movedCount
        )
        .map((child) => ({
            ...child,
            depth: elementToMove.depth + child.depth - originalDepth
        }));

    const movedElements = [
        elementToMove,
        ...children
    ];

    const insertIndexOffset = toElement.index > elementToMove.index
        ? childCount
        : 0;

    return elements
        // Delete elements at old location
        .toSpliced(
            elementToMove.index,
            movedCount
        )
        // Insert moved elements at new location
        .toSpliced(
            toElement.index - insertIndexOffset,
            0,
            ...movedElements
        )
        // Reindex
        .map((element, index) => ({
            ...element,
            index: index
        }));
};
