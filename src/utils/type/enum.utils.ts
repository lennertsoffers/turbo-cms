export type Enum<TObject extends Record<string, string>> = TObject[keyof TObject];

type IsEnum =
    <TObject extends Record<string, string>>(enumObject: TObject) =>
    (value: string) => value is Enum<TObject>;
export const isEnum: IsEnum =
    <TObject extends Record<string, string>>(enumObject: TObject) =>
    (value: string): value is Enum<TObject> => Object
        .values(enumObject)
        .includes(value);
