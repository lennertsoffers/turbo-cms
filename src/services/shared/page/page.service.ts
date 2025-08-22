type SanitizePath = (path: string) => string;
export const sanitizePath: SanitizePath = (path) => path
    .trim()
    .replace(
        /\/$/,
        ""
    );

type ParsePath = (path: string) => string[];
export const parsePath: ParsePath = (path) => sanitizePath(path)
    .split("/")
    .filter((segment) => segment);

type StringifyPath = (segments: string[]) => string;
export const stringifyPath: StringifyPath = (segments) => {
    const path = segments
        .filter((segment) => segment)
        .join("/");

    return `/${path}`;
};

type GetSlug = (path: string) => string;
export const getSlug: GetSlug = (path) => parsePath(path)
    .at(-1) ?? "";
