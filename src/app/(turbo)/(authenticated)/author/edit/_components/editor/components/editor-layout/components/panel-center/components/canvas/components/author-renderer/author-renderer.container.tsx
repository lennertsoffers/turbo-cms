"use client";

import { ComponentModel } from "@turbo-cms/core/types/config/components/component.model";
import {
    AuthorSelectors,
    useAuthorStore
} from "@turbo-cms/store/author";
import { Id } from "@turbo-cms/types-models/id.types";
import { isDefined } from "@turbo-cms/utils-general/object";

import { useAuthorContext } from "../../../../../../../../../../_context/author.context";
import { equalsId } from "../../../../../../../../../../_helpers/dnd.helpers";

import { AuthorRendererComponent } from "./author-renderer.component";
import { withRender } from "./render.hoc";

type AuthorRendererProps = {
    component: ComponentModel;
    overlay?: boolean;
};

const AuthorRenderer = ({ component, overlay }: AuthorRendererProps) => {
    const { componentMapConfig } = useAuthorContext();

    const activeComponent = useAuthorStore(AuthorSelectors.getActiveComponent);
    const selectedComponent = useAuthorStore(AuthorSelectors.getSelectedComponent);
    const hoverId = useAuthorStore(AuthorSelectors.getHoverId);
    const hoverParentId = useAuthorStore(AuthorSelectors.getHoverParentId);

    const overId = useAuthorStore(AuthorSelectors.getOverId);

    const active = component.id === activeComponent?.id;
    const selected = component.id === selectedComponent?.id;
    const over = component.id === overId;

    const hoveredComponent = hoverId === component.id;
    const hoveredParentComponent = hoverParentId === component.id;

    const componentConfig = componentMapConfig[component.name];
    if(!isDefined(componentConfig)) return null;
    if(!isDefined(component)) return null;

    return (
        <AuthorRendererComponent
            active={overlay
                ? false
                : active}
            over={overlay
                ? false
                : over}
            selected={overlay
                ? false
                : selected}
            hoveredComponent={hoveredComponent}
            hoveredParentComponent={hoveredParentComponent}
            id={component.id}
        >
            {
                withRender(componentConfig.renderAuthor)({
                    ...componentConfig?.defaultProps,
                    ...component.props,
                    turboCms: {
                        renderZone: ({ id }: { id: Id; }) => {
                            const childComponent = component.children.find(
                                equalsId(id)
                            );
                            if(!childComponent) return null;

                            return (
                                <AuthorRenderer
                                    component={childComponent}
                                    key={id}
                                />
                            );
                        },
                        component: component
                    }
                })
            }
        </AuthorRendererComponent>
    );
};

export { AuthorRenderer };
