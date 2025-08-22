import { SelectionRange } from "@/types/components/dnd/selection.types";

export const contains =
    (index: number) =>
    (range: SelectionRange) => range.start.index <= index && range.end.index >= index;
