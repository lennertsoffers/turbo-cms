import { FlatTreeElement } from "@/types/components/dnd/element.types";
import { Id } from "@/types/domain/id.types";
import { some } from "@/utils/general/function.utils";
import { isDefined } from "@/utils/general/object.utils";

type IsParentOpen = <T extends { id: Id; }>(element: FlatTreeElement<T>) => boolean;

export const isParentOpen: IsParentOpen = (
    element
) => isDefined(element.parent)
    ? !element.parent.collapsed && isParentOpen(element.parent)
    : true;

type IsRoot = <T extends { id: Id; }>(element: FlatTreeElement<T>) => boolean;
export const isRoot: IsRoot = (element) => element.depth === 0;

type IsVisible = <T extends { id: Id; }>(element: FlatTreeElement<T>) => boolean;

export const isVisible: IsVisible = some(
    isParentOpen,
    isRoot
);

type EqualsId =
    (id: Id) =>
    <T extends { id: Id; }>(element: FlatTreeElement<T>) => boolean;

export const equalsId: EqualsId =
    (id) =>
    (element) => element.id === id;
