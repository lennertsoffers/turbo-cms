import {
    defaultDropAnimation,
    DropAnimation,
    MeasuringConfiguration,
    MeasuringStrategy,
    PointerSensorOptions
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const measuring: MeasuringConfiguration = {
    droppable: {
        strategy: MeasuringStrategy.WhileDragging
    }
};

const pointerSensorOptions: PointerSensorOptions = {
    activationConstraint: {
        distance: 5
    }
};

type GetDropAnimation = (cleanup: () => void, depth?: number) => DropAnimation;
const getDropAnimation: GetDropAnimation = (cleanup, depth = 0) => ({
    easing: "ease-out",
    keyframes: ({ transform }) => [
        {
            opacity: 1,
            transform: CSS.Transform.toString(transform.initial)
        },
        {
            opacity: 0,
            transform: CSS.Transform.toString({
                ...transform.final,
                x: transform.final.x + (depth * 30),
                y: transform.final.y
            })
        }
    ],
    sideEffects: ({ active }) => {
        const animation = active.node.animate(
            [
                {
                    opacity: 0
                },
                {
                    opacity: 1
                }
            ],
            {
                duration: defaultDropAnimation.duration,
                easing: defaultDropAnimation.easing
            }
        );

        animation.addEventListener(
            "remove",
            cleanup
        );

        animation.addEventListener(
            "cancel",
            cleanup
        );

        animation.addEventListener(
            "finish",
            cleanup
        );
    }
});

export const DndConfig = {
    measuring: measuring,
    pointerSensorOptions: pointerSensorOptions,
    getDropAnimation: getDropAnimation
};
