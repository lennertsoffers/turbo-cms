import { Maybe } from "@sweet-monads/maybe";

import {
    ifJust,
    ifNone
} from "./maybe.utils";

type CaseOf =
    <T>(cases: {
        onJust: (value: T) => void;
        onNone: () => void;
    }) =>
    (maybe: Maybe<T>) => void;
export const caseOf: CaseOf =
    ({ onJust, onNone }) =>
    (maybe) => {
        ifJust(maybe)(onJust);
        ifNone(maybe)(onNone);
    };

type Map =
    <TMaybe, TResult>(mapper: (maybe: TMaybe) => TResult) =>
    (maybe: Maybe<TMaybe>) => Maybe<TResult>;
export const map: Map =
    (mapper) =>
    (maybe) => maybe.map(mapper);

type AsyncMap =
    <TMaybe, TResult>(mapper: (maybe: TMaybe) => Promise<TResult>) =>
    (maybe: Maybe<TMaybe>) => Promise<Maybe<TResult>>;
export const asyncMap: AsyncMap =
    (mapper) =>
    (maybe) => maybe.asyncMap(mapper);

type Unwrap =
    <TMaybe>(errorFactory?: () => unknown) =>
    (maybe: Maybe<TMaybe>) => TMaybe;
export const unwrap: Unwrap =
    (errorFactory) =>
    (maybe) => maybe.unwrap(errorFactory);

type IsJust = <TMaybe>(maybe: Maybe<TMaybe>) => boolean;
export const isJust: IsJust = (maybe) => maybe.isJust();
