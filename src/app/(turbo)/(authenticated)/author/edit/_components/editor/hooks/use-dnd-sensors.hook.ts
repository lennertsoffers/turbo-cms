import {
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";

export const useDndSensors = () =>
    useSensors(
        useSensor(
            PointerSensor,
            {
                activationConstraint: {
                    delay: 250,
                    distance: 2,
                    tolerance: 10
                }
            }
        ),
        useSensor(
            TouchSensor,
            {
                activationConstraint: {
                    delay: 250,
                    distance: 2,
                    tolerance: 10
                }
            }
        )
    );
