import {
    parseJson,
    stringifyJson
} from "@/utils/general/json.utils";

import { LocalStorageKey } from "./storage.config";

type GetObject = <T extends object>(key: LocalStorageKey) => Partial<T>;

export const getObject: GetObject = <T extends object>(key: LocalStorageKey) => {
    try {
        const obj = localStorage.getItem(key);
        if(!obj) return {};

        const parsedObj = parseJson<T>(obj);
        if(Array.isArray(parsedObj)) return {};
        if(typeof parsedObj !== "object") return {};

        return parsedObj;
    } catch {
        return {};
    }
};

type SetObject = <T extends object>(key: LocalStorageKey, value: T) => void;

export const setObject: SetObject = (key, value) => {
    try {
        localStorage.setItem(
            key,
            stringifyJson(value)
        );
    } catch {
        return;
    }
};

type UpdateObject = <T extends object>(key: LocalStorageKey, value: Partial<T>) => void;

export const updateObject: UpdateObject = (key, value) => {
    try {
        const obj = getObject(key);
        setObject(
            key,
            {
                ...obj,
                ...value
            }
        );
    } catch {
        return;
    }
};

type GetArray = <TItem>(key: LocalStorageKey) => TItem[];

export const getArray: GetArray = <TItem>(key: LocalStorageKey) => {
    try {
        const array = localStorage.getItem(key);
        if(!array) return [];

        const parsedArray = parseJson<TItem>(array);
        if(!Array.isArray(parsedArray)) return [];

        return parsedArray;
    } catch {
        return [];
    }
};

type SetArray = <TItem>(key: LocalStorageKey, value: TItem[]) => void;

export const setArray: SetArray = (key, value) => {
    try {
        localStorage.setItem(
            key,
            stringifyJson(value)
        );
    } catch {
        return;
    }
};
