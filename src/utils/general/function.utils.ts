import { isDefined } from "./object.utils";

export const attempt = <TReturn>(callback: () => TReturn, fallback?: TReturn) => {
    try {
        return callback();
    } catch (error) {
        console.error(error);

        return isDefined(fallback)
            ? fallback
            : undefined;
    }
};

type Noop = () => void;
export const noop: Noop = () => {};

type Every =
    <T>(...predicates: ((value: T) => boolean)[]) =>
    (value: T) => boolean;
export const every: Every =
    (...predicates) =>
    (value) =>
        predicates.every((predicate) => predicate(value));

type Some =
    <T>(...predicates: ((value: T) => boolean)[]) =>
    (value: T) => boolean;
export const some: Some =
    (...predicates) =>
    (value) =>
        predicates.some((predicate) => predicate(value));
