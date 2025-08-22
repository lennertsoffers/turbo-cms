import { Id } from "../../domain/id.types";

export type Selection = {
    id: Id;
    index: number;
};

export type SelectionRange = {
    start: Selection;
    end: Selection;
};

export type Selections<T extends { id: Id; }> = {
    ranges: SelectionRange[];
    lastSelection?: { id: Id; } & T;
    previousExtension?: SelectionRange;
};
