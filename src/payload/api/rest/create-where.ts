import { AxiosInstance } from "axios";

import { extracting } from "@/utils/general/array.utils";

import {
    PayloadCollection,
    PayloadCollectionSlug
} from "../../types/payload-collection.type";

export type Create =
    <TCollection extends PayloadCollectionSlug>(
        collection: TCollection
    ) =>
    (doc: Partial<PayloadCollection<TCollection>>) => Promise<PayloadCollection<TCollection>>;

type CreateCreate = (axios: AxiosInstance) => Create;
export const createCreate: CreateCreate =
    (axios) =>
    (collection) =>
    async (doc) => {
        const endpoint = `/api/${collection}`;

        return axios
            .post<PayloadCollection<typeof collection>>(
                endpoint,
                doc
            )
            .then(extracting("data"));
    };
