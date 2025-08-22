"use server";

import {
    useCallback,
    useMemo
} from "react";

import {
    ComponentMapConfigModel,
    DefaultComponentMapProps,
    Render
} from "@turbo-cms/core/types/config/components/component-config.model";
import { ComponentModel } from "@turbo-cms/core/types/config/components/component.model";
import { Id } from "@turbo-cms/types-models/id.types";
import { isDefined } from "@turbo-cms/utils-general/object";

import { equalsId } from "../../_helpers/dnd.helpers";

type RendererProps<
    TComponentPropsMap extends DefaultComponentMapProps = Record<string, any>,
> = {
    componentMapConfig: ComponentMapConfigModel<TComponentPropsMap>;
    component: ComponentModel;
    author?: boolean;
};

export const Renderer = async ({
    componentMapConfig,
    component,
    author
}: RendererProps) => {
    const componentConfig = componentMapConfig[component.name];
    if(!isDefined(componentConfig)) return null;

    const renderZone: Render<{ id: Id; }> = useCallback(
        ({ id }) => {
            const zoneComponent = component.children.find(equalsId(id));
            if(!zoneComponent) return null;

            return (
                <Renderer
                    component={zoneComponent}
                    componentMapConfig={componentMapConfig}
                    key={id}
                />
            );
        },
        [
            componentMapConfig,
            component.name
        ]
    );

    const renderProps = useMemo(
        () => ({
            ...componentConfig.defaultProps,
            ...component.props,
            turboCms: {
                renderZone: renderZone,
                component: component
            }
        }),
        [
            componentConfig,
            component,
            renderZone
        ]
    );

    return author
        ? componentConfig.renderAuthor(renderProps)
        : componentConfig.renderPublisher(renderProps);
};
