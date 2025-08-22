type Bounded = (value: number, bounds: [min: number, max: number]) => number;
export const bounded: Bounded = (value, [
    min,
    max
]) => Math.min(
    max,
    Math.max(
        min,
        value
    )
);
