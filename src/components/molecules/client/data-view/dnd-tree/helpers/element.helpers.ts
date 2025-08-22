import {
    ElementProjection,
    FlatTreeElement
} from "@/types/components/dnd/element.types";
import { Id } from "@/types/domain/id.types";
import {
    equals,
    not
} from "@/utils/general/array.utils";
import { isDefined } from "@/utils/general/object.utils";

type CreateGetDepth =
    (activeElement?: FlatTreeElement, projection?: ElementProjection) =>
    (element: FlatTreeElement) => number;

export const createGetDepth: CreateGetDepth =
    (activeElement, projection) =>
    ({ id, depth }) =>
        isDefined(activeElement)
        && isDefined(projection)
        && id === activeElement.id
            ? projection.depth
            : depth;

type ToggleElementId =
    (element: FlatTreeElement) =>
    (openElementIds: Id[]) => Id[];

export const toggleElementId: ToggleElementId =
    ({ id }) =>
    (openElementIds) => openElementIds.includes(id)
        ? openElementIds.filter(not(equals(id)))
        : [
            ...openElementIds,
            id
        ];
