import { isDefined } from "./object.utils";

type Extracting =
    <TObject extends object, TKey extends keyof TObject>(
        property: TKey
    ) =>
    (obj: TObject) => TObject[TKey];

type PropertyEquals =
    <TObject extends object, TKey extends keyof TObject, TValue extends TObject[TKey]>(
        property: TKey,
        value: TValue
    ) =>
    (obj: TObject) => boolean;

type Equals =
    <T>(toEqual: T) =>
    (value: T) => boolean;

type NotEquals =
    <T>(notToEqual: T) =>
    (value: T) => boolean;

type Mapping =
    <TValue, TOtherValue>(
        mapper: (value: TValue) => TOtherValue
    ) =>
    (values: TValue[]) => TOtherValue[];

type AsyncDestruct =
    <TObject, TReturn>(
        f: (obj: TObject) => TReturn
    ) =>
    (obj: Promise<TObject>) => Promise<TReturn>;

type IsEmpty = <TValue>(
    array: TValue[] | null | undefined
) => boolean;

type IsNotEmpty = <TValue>(
    array: TValue[] | null | undefined
) => array is TValue[];

type ToArray = <TValue>(value: TValue | TValue[]) => TValue[];

type FilterDefined = <TValue>(array: (TValue | null | undefined)[]) => TValue[];

type Not =
    <T>(predicate: (value: T) => boolean) =>
    (value: T) => boolean;

export const not: Not =
    (predicate) =>
    (value) => !predicate(value);

export const extracting: Extracting =
    (property) =>
    (obj) => obj[property];

export const equals: Equals =
    (toEqual) =>
    (value) => value === toEqual;

export const notEquals: NotEquals =
    (notToEqual) =>
    (value) => value !== notToEqual;

export const propertyEquals: PropertyEquals =
    (property, value) =>
    (obj) =>
        obj[property] === value;

export const mapping: Mapping =
    (mapper) =>
    (values) =>
        values.map(mapper);

export const asyncDestruct: AsyncDestruct =
    (f) =>
    async (obj) =>
        f(await obj);

export const isEmpty: IsEmpty = (array) => !array?.length;

export const isNotEmpty: IsNotEmpty = <TValue>(
    array: TValue[] | null | undefined
): array is TValue[] => !!array?.length;

export const toArray: ToArray = (value) => Array.isArray(value)
    ? value
    : [ value ];

export const filterDefined: FilterDefined = (array) => array.filter(isDefined);
