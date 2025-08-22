import { DropAnimation } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

import { isNewPlaceholder } from "../../../../../../../../helpers/component.helpers";

export const dropAnimation: DropAnimation = {
    easing: "ease-out",
    keyframes: ({ transform, active }) => [
        {
            transform: CSS.Transform.toString(transform.initial)
        },
        {
            transform: CSS.Transform.toString(
                isNewPlaceholder(active)
                    ? transform.initial
                    : transform.final
            )
        }
    ],
    sideEffects: ({ active }) => {
        active.node.animate(
            [
                {
                    opacity: 1
                }
            ],
            {
                duration: 0
            }
        );
    }
};
