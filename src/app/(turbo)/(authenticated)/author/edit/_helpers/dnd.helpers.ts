import { ComponentMapConfig } from "@turbo-cms/core/config/components/component-map.config";
import { ComponentModel } from "@turbo-cms/core/types/config/components/component.model";
import { Id } from "@turbo-cms/types-models/id.types";

export const getDropZoneIds = (component: ComponentModel, ids: Id[] = []) => {
    const config =
        ComponentMapConfig[component.name as keyof typeof ComponentMapConfig];

    if(config.hasDropZone) {
        ids.push(component.id);
    }

    component.children.forEach((child) => getDropZoneIds(
        child,
        ids
    ));

    return ids;
};

export const equalsId =
    (id: Id) =>
    (component: ComponentModel) =>
        component.id === id;
