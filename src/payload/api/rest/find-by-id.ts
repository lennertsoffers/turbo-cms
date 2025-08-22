import { Maybe } from "@sweet-monads/maybe";
import { AxiosInstance } from "axios";

import { Id } from "@/types/domain/id.types";
import { extracting } from "@/utils/general/array.utils";

import {
    PayloadCollection,
    PayloadCollectionSlug
} from "../../types/payload-collection.type";

export type FindById =
    <TCollection extends PayloadCollectionSlug>(
        collection: TCollection
    ) =>
    ({
        id,
        depth
    }: {
        id: Id;
        depth?: number;
    }) => Promise<Maybe<PayloadCollection<TCollection>>>;

type CreateFindById = (axios: AxiosInstance) => FindById;
export const createFindById: CreateFindById =
    (axios) =>
    (collection) =>
    async ({ id, depth }) => {
        const endpoint = `/api/${collection}/${id}`;

        return axios
            .get<any>(endpoint)
            .then(extracting("data"));
    };
