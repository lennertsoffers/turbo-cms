import {
    closestCorners,
    CollisionDetection,
    pointerWithin
} from "@dnd-kit/core";

import { ComponentModel } from "@turbo-cms/core/types/config/components/component.model";
import { Id } from "@turbo-cms/types-models/id.types";
import { extracting } from "@turbo-cms/utils-general/array";
import { isDefined } from "@turbo-cms/utils-general/object";

import { isNewPlaceholder } from "./component.helpers";
import { isNotPlaceholder } from "./placeholder.helpers";

type ClosestCornersWithIdIn = (allowedIds: Id[]) => CollisionDetection;
const closestCornersWithIdIn: ClosestCornersWithIdIn =
    (allowedIds) =>
    ({
        active,
        collisionRect,
        droppableContainers,
        droppableRects,
        pointerCoordinates
    }) =>
        closestCorners({
            active: active,
            collisionRect: collisionRect,
            droppableContainers: droppableContainers.filter(
                ({ id }) => allowedIds.includes(id)
            ),
            droppableRects: droppableRects,
            pointerCoordinates: pointerCoordinates
        });

type CreateCollisionDetection = (
    dropZoneIds: Id[],
    activeParent?: ComponentModel,
    selectedComponent?: ComponentModel
) => CollisionDetection;
export const createCollisionDetection: CreateCollisionDetection =
    (dropZoneIds, activeParent, selectedComponent) =>
    ({
        active,
        collisionRect,
        droppableContainers,
        droppableRects,
        pointerCoordinates
    }) => {
        const isNewComponent = isNewPlaceholder(active);
        if(!isDefined(activeParent) && !isNewComponent) return [];

        const allowedIds = isDefined(selectedComponent)
            ? [ selectedComponent.id ]
            : dropZoneIds;

        const collisions = pointerWithin({
            active: active,
            collisionRect: collisionRect,
            droppableContainers: droppableContainers.filter(
                (container) => allowedIds.includes(container.id)
            ),
            droppableRects: droppableRects,
            pointerCoordinates: pointerCoordinates
        })
            .filter(isNotPlaceholder);

        if(
            isDefined(activeParent)
            && !isDefined(selectedComponent)
            && collisions.find(({ id }) => activeParent.id === id)
            && !isNewComponent
        ) {
            const childIds = activeParent.children.map(extracting("id"));

            return closestCornersWithIdIn(childIds)({
                active: active,
                collisionRect: collisionRect,
                droppableContainers: droppableContainers,
                droppableRects: droppableRects,
                pointerCoordinates: pointerCoordinates
            });
        } else {
            return collisions;
        }
    };
