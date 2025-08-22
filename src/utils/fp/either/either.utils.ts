import { Either } from "@sweet-monads/either";

// --- Sync --- //
type UnwrapAndDo =
    <TLeft, TRight>(either: Either<TLeft, TRight>) =>
    (fn: (value: TLeft | TRight) => void) => void;
export const unwrapAndDo: UnwrapAndDo =
    (either) =>
    (fn) => fn(either.value);

type IfLeft =
    <TLeft, TRight>(either: Either<TLeft, TRight>) =>
    (fn: (value: TLeft) => void) => void;
export const ifLeft: IfLeft =
    (either) =>
    (fn) => (either.isLeft()
        ? fn(either.value)
        : undefined);

type IfRight =
    <TLeft, TRight>(either: Either<TLeft, TRight>) =>
    (fn: (value: TRight) => void) => void;
export const ifRight: IfRight =
    (either) =>
    (fn) =>
        either.isRight()
            ? fn(either.value)
            : undefined;

type CaseOf =
    <TLeft, TRight>(either: Either<TLeft, TRight>) =>
    (cases: {
        onLeft: (value: TLeft) => void;
        onRight: (value: TRight) => void;
    }) => void;
export const caseOf: CaseOf =
    (either) =>
    ({ onLeft, onRight }) => {
        ifLeft(either)(onLeft);
        ifRight(either)(onRight);
    };

// --- Async --- //
type UnwrapAndDoAsync =
<TLeft, TRight>(eitherPromise: Promise<Either<TLeft, TRight>>) =>
(fn: (value: TLeft | TRight) => void) => void;
export const unwrapAndDoAsync: UnwrapAndDoAsync =
    (eitherPromise) =>
    async (fn) => unwrapAndDo(await eitherPromise)(fn);

type IfLeftAsync =
    <TLeft, TRight>(eitherPromise: Promise<Either<TLeft, TRight>>) =>
    (fn: (value: TLeft) => void) => void;
export const ifLeftAsync: IfLeftAsync =
    (eitherPromise) =>
    async (fn) => ifLeft(await eitherPromise)(fn);

type IfRightAsync =
    <TLeft, TRight>(eitherPromise: Promise<Either<TLeft, TRight>>) =>
    (fn: (value: TRight) => void) => void;
export const ifRightAsync: IfRightAsync =
    (eitherPromise) =>
    async (fn) => ifRight(await eitherPromise)(fn);

type CaseOfAsync =
    <TLeft, TRight>(eitherPromise: Promise<Either<TLeft, TRight>>) =>
    (cases: {
        onLeft: (value: TLeft) => void;
        onRight: (value: TRight) => void;
    }) => void;
export const caseOfAsync: CaseOfAsync =
    (eitherPromise) =>
    async (cases) => caseOf(await eitherPromise)(cases);
