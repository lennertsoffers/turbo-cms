import {
    Maybe,
    none
} from "@sweet-monads/maybe";

type IfJust =
    <T>(maybe: Maybe<T>) =>
    (fn: (value: T) => void) => void;

type IfNone =
    <T>(maybe: Maybe<T>) =>
    (fn: () => void) => void;

type CaseOf =
    <T>(
        maybe: Maybe<T>
    ) =>
    (cases: { onJust: (value: T) => void;
              onNone: () => void; }) => void;

type Flatten = <T>(maybe: Maybe<T>) => T[];

type Destruct = <T extends object>(maybe: Maybe<T>) => Partial<T>;

type LazyMerge = <T>(...maybeArray: (() => Maybe<T>)[]) => Maybe<T>;

type IfJustAsync =
    <T>(maybePromise: Promise<Maybe<T>>) =>
    (fn: (value: T) => void) => void;

type IfNoneAsync =
    <T>(maybePromise: Promise<Maybe<T>>) =>
    (fn: () => void) => void;

type CaseOfAsync =
    <T>(
        maybePromise: Promise<Maybe<T>>
    ) =>
    (cases: { onJust: (value: T) => void;
              onNone: () => void; }) => void;

type LazyMergeAsync = <T>(
    ...maybeArray: (() => Maybe<T> | Promise<Maybe<T>>)[]
) => Promise<Maybe<T>>;

export const ifJust: IfJust =
    (maybe) =>
    (fn) => maybe.isJust()
        ? fn(maybe.unwrap())
        : undefined;

export const ifNone: IfNone =
    (maybe) =>
    (fn) => maybe.isNone()
        ? fn()
        : undefined;

export const caseOf: CaseOf =
    (maybe) =>
    ({ onJust, onNone }) => {
        ifJust(maybe)(onJust);
        ifNone(maybe)(onNone);
    };

export const flatten: Flatten = (maybe) => maybe
    .map(Array.of)
    .unwrapOr([]);

export const destruct: Destruct = (maybe) =>
    maybe.fold(
        () => ({
        }),
        (value) => value
    );

export const lazyMerge: LazyMerge = (...maybeArray) => {
    for (const lazyMaybe of maybeArray) {
        const maybe = lazyMaybe();
        if(maybe.isJust()) return maybe;
    }

    return none();
};

export const ifJustAsync: IfJustAsync =
    (maybePromise) =>
    async (fn) =>
        ifJust(await maybePromise)(fn);

export const ifNoneAsync: IfNoneAsync =
    (maybePromise) =>
    async (fn) =>
        ifNone(await maybePromise)(fn);

export const caseOfAsync: CaseOfAsync =
    (maybePromise) =>
    async (cases) =>
        caseOf(await maybePromise)(cases);

export const lazyMergeAsync: LazyMergeAsync = async (...maybeArray) => {
    for (const lazyMaybe of maybeArray) {
        const maybe = await lazyMaybe();
        if(maybe.isJust()) return maybe;
    }

    return none();
};
