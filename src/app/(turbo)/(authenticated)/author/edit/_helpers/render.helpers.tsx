import {
    ComponentMapConfig,
    getComponentConfig
} from "@turbo-cms/core/config/components/component-map.config";
import { ComponentModel } from "@turbo-cms/core/types/config/components/component.model";
import { Id } from "@turbo-cms/types-models/id.types";
import { isDefined } from "@turbo-cms/utils-general/object";

import { Renderer } from "../_components/renderer/renderer.container";

export const renderServerComponents = (
    component: ComponentModel,
    map: Map<Id, JSX.Element> = new Map()
) => {
    const config = getComponentConfig(component.name);
    const hasServerComponent = isDefined(config?.renderAuthorServer);

    if(hasServerComponent) {
        map.set(
            component.id,
            <Renderer
                author={true}
                component={component}
                componentMapConfig={ComponentMapConfig}
                key={component.id}
            />
        );
    } else {
        component.children.forEach((child) => renderServerComponents(
            child,
            map
        ));
    }

    return map;
};
