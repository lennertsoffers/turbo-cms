import { Maybe } from "@sweet-monads/maybe";
import { AxiosInstance } from "axios";

import { Id } from "@/types/domain/id.types";
import { extracting } from "@/utils/general/array.utils";

import {
    PayloadCollection,
    PayloadCollectionSlug
} from "../../types/payload-collection.type";

export type DeleteById =
    <TCollection extends PayloadCollectionSlug>(
        collection: TCollection
    ) =>
    ({ id }: { id: Id; }) => Promise<Maybe<PayloadCollection<TCollection>>>;

type CreateDeleteById = (axios: AxiosInstance) => DeleteById;
export const createDeleteById: CreateDeleteById =
    (axios) =>
    (collection) =>
    async ({ id }) => {
        const endpoint = `/api/${collection}/${id}`;

        return axios
            .delete<any>(endpoint)
            .then(extracting("data"));
    };
