import { Id } from "../../domain/id.types";

export type TreeElement<T extends { id: Id; }> = {
    id: Id;
    children: TreeElement<T>[];
} & T;

export type FlatTreeElement<T extends { id: Id; }> = {
    id: Id;
    index: number;
    depth: number;
    collapsed: boolean;
    parent?: FlatTreeElement<T>;
    children: FlatTreeElement<T>[];
} & T;

export type ElementProjection<T extends { id: Id; }> = {
    depth: number;
    parent?: FlatTreeElement<T>;
};
