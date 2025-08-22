import { AxiosInstance } from "axios";

import { Id } from "@/types/domain/id.types";
import { extracting } from "@/utils/general/array.utils";

import {
    PayloadCollection,
    PayloadCollectionSlug
} from "../../types/payload-collection.type";

export type UpdateById =
    <TCollection extends PayloadCollectionSlug>(
        collection: TCollection
    ) =>
    (
        id: Id,
        doc: Partial<PayloadCollection<TCollection>>
    ) => Promise<PayloadCollection<TCollection>>;

type CreateUpdateById = (axios: AxiosInstance) => UpdateById;
export const createUpdateById: CreateUpdateById =
    (axios) =>
    (collection) =>
    async (id, doc) => {
        const endpoint = `/api/${collection}/${id}`;

        return axios
            .patch<PayloadCollection<typeof collection>>(
                endpoint,
                doc
            )
            .then(extracting("data"));
    };
