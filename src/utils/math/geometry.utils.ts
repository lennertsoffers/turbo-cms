export const overlapInclusive = (
    [
        x1,
        x2 ]: [number, number
    ],
    [
        y1,
        y2 ]: [number, number
    ]
) => x1 <= y2 && y1 <= x2;

export const overlapExclusive = (
    [
        x1,
        x2 ]: [number, number
    ],
    [
        y1,
        y2 ]: [number, number
    ]
) => x1 < y2 && y1 < x2;
