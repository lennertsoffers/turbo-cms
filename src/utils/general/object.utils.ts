export const isDefined = <T>(value: T | null | undefined): value is T =>
    value !== undefined && value !== null;

export const isObject = <T>(value: object | T): value is object =>
    isDefined(value)
        ? [
            "function",
            "object"
        ].includes(typeof value)
        : false;

export const entries = <TObject extends object>(obj: TObject) =>
    Object.entries(obj) as [keyof TObject, TObject[keyof TObject]][];

export const keys = <TObject extends object>(obj: TObject) =>
    Object.keys(obj) as [keyof TObject];

export const values = <TObject extends object>(obj: TObject) =>
    Object.values(obj) as TObject[keyof TObject][];

export const hasKey =
    <TObject extends object>(obj: TObject) =>
    (key: number | string | symbol): key is keyof TObject =>
        key in obj;

export function parseJson<TObject extends (Array<any> | object)>(
    json: string
): TObject | undefined;
export function parseJson<TObject extends (Array<any> | object)>(
    json: string, defaultValue: TObject
): TObject;
export function parseJson<TObject extends (Array<any> | object)>(
    json: string,
    defaultValue?: TObject
): TObject | undefined {
    try {
        return JSON.parse(json) as TObject;
    } catch {
        return defaultValue !== undefined
            ? defaultValue
            : undefined;
    }
}

export const stringifyJson = <TObject extends (Array<any> | object)>(
    value: TObject
) => {
    try {
        return JSON.stringify(value);
    } catch {
        return "";
    }
};
