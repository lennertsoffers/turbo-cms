const replacer = (_key: string, value: any) => {
    if(value instanceof Map) {
        return {
            dataType: "Map",
            value: Array.from(value.entries())
        };
    } else if(value instanceof Set) {
        return {
            dataType: "Set",
            value: Array.from(value.values())
        };
    } else {
        return value;
    }
};

const reviver = (_key: string, value: any) => {
    if(!value) return value;

    if(value.dataType === "Map") {
        return new Map(value.value);
    } else if(value && value.dataType === "Set") {
        return new Set(value.value);
    } else {
        return value;
    }
};

type StringifyJson = <T>(data: T) => string;

export const stringifyJson: StringifyJson = (data) => JSON.stringify(
    data,
    replacer
);

type ParseJson = <T>(data: string) => T;

export const parseJson: ParseJson = (data) => JSON.parse(
    data,
    reviver
);
