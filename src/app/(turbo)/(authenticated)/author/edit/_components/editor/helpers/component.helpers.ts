
import { ComponentMapConfigModel } from "@turbo-cms/core/types/config/components/component-config.model";
import { ComponentModel } from "@turbo-cms/core/types/config/components/component.model";
import { Id } from "@turbo-cms/types-models/id.types";
import {
    extracting,
    isNotEmpty
} from "@turbo-cms/utils-general/array";
import { isDefined } from "@turbo-cms/utils-general/object";

import {
    NEW_COMPONENT_ID_PREFIX,
    NEW_COMPONENT_PLACEHOLDER_ID_PREFIX
} from "../../../config";
import { InsertStrategy } from "../types/enums/insert-strategy.enum";

type FindById =
    (component: ComponentModel) =>
    (id: Id) => ComponentModel | undefined;
export const findById: FindById =
    (component) =>
    (id) => {
        if(component.id === id) return component;

        if(isNotEmpty(component.children)) {
            for (const child of component.children) {
                const foundChild = findById(child)(id);
                if(foundChild) return foundChild;
            }
        }

        return undefined;
    };

type FindParentById =
    (
        component: ComponentModel,
        parent?: ComponentModel
    ) =>
    (id: Id) => ComponentModel | undefined;
export const findParentById: FindParentById =
    (component, parent) =>
    (id) => {
        if(component.id === id) return parent;

        for (const child of component.children) {
            const foundParent = findParentById(
                child,
                component
            )(id);

            if(foundParent) return foundParent;
        }

        return undefined;
    };

type RemoveById =
    (component: ComponentModel) =>
    (id: Id) => ComponentModel | undefined;
export const removeById: RemoveById =
    (component) =>
    (id) => {
        if(component.id === id) return undefined;

        return {
            ...component,
            children: component.children
                .map((child) => removeById(child)(id))
                .filter(isDefined)
        };
    };

type InsertAtId =
    (
        originalComponent: ComponentModel,
        insert: ComponentModel,
        strategy:
          | typeof InsertStrategy.AFTER
          | typeof InsertStrategy.BEFORE
          | typeof InsertStrategy.ON
    ) =>
    (id: Id) => ComponentModel;
export const insertAtId: InsertAtId =
    (
        originalComponent,
        insert,
        location
    ) =>
    (id) => {
        const newZones: ComponentModel[] = [];

        for (const child of originalComponent.children) {
            if(child.id === id) {
                if(location === InsertStrategy.BEFORE) {
                    newZones.push(insert);
                    newZones.push(insertAtId(
                        child,
                        insert,
                        location
                    )(id));
                } else if(location === InsertStrategy.AFTER) {
                    newZones.push(insertAtId(
                        child,
                        insert,
                        location
                    )(id));
                    newZones.push(insert);
                } else {
                    newZones.push({
                        ...child,
                        children: [ insert ]
                    });
                }
            } else {
                newZones.push(insertAtId(
                    child,
                    insert,
                    location
                )(id));
            }
        }

        return {
            ...originalComponent,
            children: newZones
        };
    };

type InsertBetweenIds =
    (
        originalComponent: ComponentModel,
        insert: ComponentModel
    ) =>
    (
        afterId: Id,
        beforeId: Id
    ) => ComponentModel;
export const insertBetweenIds: InsertBetweenIds =
    (
        originalComponent,
        insert
    ) =>
    (
        afterId,
        beforeId
    ) => {
        const childIds = originalComponent.children.map(extracting("id"));
        const boundIndexes = [
            childIds.indexOf(afterId),
            childIds.indexOf(beforeId)
        ]
            .filter((index) => index !== -1)
            .sort();

        if(boundIndexes.length !== 2) {
            return {
                ...originalComponent,
                children: originalComponent.children.map((child) =>
                    insertBetweenIds(
                        child,
                        insert
                    )(
                        afterId,
                        beforeId
                    ))
            };
        }

        originalComponent.children.splice(
            boundIndexes.at(-1)!,
            0,
            insert
        );

        return originalComponent;
    };

type AppendAtId =
    (
        component: ComponentModel,
        insert: ComponentModel
    ) =>
    (id: Id) => ComponentModel;
export const appendAtId: AppendAtId =
    (
        component,
        insert
    ) =>
    (id) => ({
        ...component,
        children:
        component.id === id
            ? [
                ...component.children,
                insert
            ]
            : component.children.map((child) => appendAtId(
                child,
                insert
            )(id))
    });

type IsDroppable =
    (componentMapConfig: ComponentMapConfigModel) =>
    (component: ComponentModel) => boolean;
export const isDroppable: IsDroppable =
    (componentMapConfig) =>
    (component) =>
        isDefined(component) && (componentMapConfig[component.name]?.hasDropZone ?? false);

type IsNew = (component: { id: Id; }) => boolean;
export const isNew: IsNew = ({ id }) => id
    .toString()
    .startsWith(NEW_COMPONENT_ID_PREFIX);

type IsNewPlaceholder = (component: { id: Id; }) => boolean;
export const isNewPlaceholder: IsNewPlaceholder = ({ id }) => id
    .toString()
    .startsWith(NEW_COMPONENT_PLACEHOLDER_ID_PREFIX);

type UpdatePropWithValue =
    (component: ComponentModel, componentId: Id) =>
    (propName: string, propValue: number | string) => ComponentModel;
export const updatePropWithValue: UpdatePropWithValue =
    (component, componentId) =>
    (propName, propValue) => ({
        ...component,
        props: component.id === componentId
            ? {
                ...component.props,
                [propName]: {
                    type: "value",
                    value: propValue
                }
            }
            : component.props,
        children: component.children.map(
            (child) => updatePropWithValue(
                child,
                componentId
            )(
                propName,
                propValue
            )
        )
    });

type ClearProps =
    (component: ComponentModel, componentId: Id) =>
    (propNames: string[]) => ComponentModel;
export const clearProps: ClearProps =
    (component, componentId) =>
    (propNames) => ({
        ...component,
        props: component.id === componentId
            ? Object.fromEntries(
                Object.entries(component.props)
                    .filter(([ key ]) => !propNames.includes(key))
            )
            : component.props,
        children: component.children.map(
            (child) => clearProps(
                child,
                componentId
            )(
                propNames
            )
        )
    });

type UpdatePropWithVariable =
    (component: ComponentModel, componentId: Id) =>
    (propName: string, variableId: Id) => ComponentModel;
export const updatePropWithVariable: UpdatePropWithVariable =
    (component, componentId) =>
    (propName, variableId) => ({
        ...component,
        props: component.id === componentId
            ? {
                ...component.props,
                [propName]: {
                    type: "variable",
                    id: variableId
                }
            }
            : component.props,
        children: component.children.map(
            (child) => updatePropWithVariable(
                child,
                componentId
            )(
                propName,
                variableId
            )
        )
    });
