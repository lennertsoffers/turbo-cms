import {
    fromNullable,
    just,
    none
} from "@sweet-monads/maybe";
import {
    BasePayload,
    Payload
} from "payload";

import { Config } from "@/config/payload/payload.types";
import { isDefined } from "@/utils/general/object.utils";

type DeleteAll =
    (
        payload: Payload
    ) =>
    <TCollection extends keyof Config["collections"]>(collection: TCollection) => void;
const deleteAll: DeleteAll =
    (payload) =>
    (collection) => {
        payload.delete({
            collection: collection,
            where: {
                id: {
                    exists: true
                }
            }
        });
    };

export { deleteAll };

export const orFindById =
    (payload: BasePayload | Promise<BasePayload>) =>
    <
        TCollection extends keyof Config["collections"],
        TValue extends Config["collections"][TCollection]
    >(
        collection: TCollection
    ) =>
    async (value: string | TValue | null | undefined) => {
        if(!isDefined(value)) return none();
        if(typeof value !== "string") return just(value);

        return (await payload)
            .findByID({
                collection: collection,
                id: value
            })
            .then(fromNullable);
    };

export const getId = <
    TCollection extends keyof Config["collections"],
    TValue extends Config["collections"][TCollection]
>(value: string | TValue) => typeof value === "string"
    ? value
    : value.id;
