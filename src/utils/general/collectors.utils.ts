import { KeyOf, ValueOf } from "@/utils/type/object.utils";
import { hasKey } from "./object.utils";

type CollectingObject = <TObject extends object, TValue>(
    fn: (
        value: TValue,
        currentIndex: number,
        array: TValue[]
    ) => {
        key: KeyOf<TObject>;
        newValue: ValueOf<TObject>;
    }
) => (
    mergeValues: (oldValue: ValueOf<TObject>, newValue: ValueOf<TObject>) => ValueOf<TObject>
) => (acc: TObject, value: TValue, currentIndex: number, array: TValue[]) => TObject;
export const collectingObject: CollectingObject =
    (fn) => (mergeValues) => (acc, value, currentIndex, array) => {
        const { key, newValue } = fn(value, currentIndex, array);

        return {
            ...acc,
            [key]: hasKey(acc)(key) ? mergeValues(acc[key], newValue) : newValue
        };
    };
