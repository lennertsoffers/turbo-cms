import { TurboContext } from "@turbo-cms/api/turbo-context";
import { Component } from "@turbo-cms/config/payload/payload.types";
import { ComponentModel } from "@turbo-cms/core/types/config/components/component.model";
import {
    isJust,
    unwrap
} from "@turbo-cms/utils-fp/maybe-callback";
import { orFindById } from "@turbo-cms/utils-payload/collection";

type CreateComponentModel = (component: Component) => Promise<ComponentModel>;
export const createComponentModel: CreateComponentModel = async (component) => {
    const children = await Promise.all(component.children?.map(orFindById(TurboContext.getPayload())("components")) ?? []);

    const components = children
        .filter(isJust)
        .map(unwrap());

    const resolvedZones = await Promise.all(components.map(createComponentModel));

    return {
        ...component,
        children: resolvedZones
    };
};
