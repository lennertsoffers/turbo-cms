import { stringify } from "qs-esm";

type CreateQuery = (options: object) => string;
export const createQuery: CreateQuery = (options) => stringify(
    options,
    {
        addQueryPrefix: true
    }
);
