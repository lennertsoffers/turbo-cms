import { AxiosInstance } from "axios";
import {
    PaginatedDocs,
    Sort,
    Where
} from "payload";

import { Pagination } from "@turbo-cms/types-payload/api/request/pagination.types";
import { extracting } from "@/utils/general/array.utils";

import {
    PayloadCollection,
    PayloadCollectionSlug
} from "../../types/payload-collection.type";

import { createQuery } from "./helpers/query.helpers";

export type FindWhere =
    <TCollection extends PayloadCollectionSlug>(
        collection: TCollection
    ) =>
    ({ where, pagination, depth }: {
        where?: Where;
        pagination?: Pagination;
        sort?: Sort;
        depth?: number;
    }) => Promise<PaginatedDocs<PayloadCollection<TCollection>>>;

type CreateFindWhere = (axios: AxiosInstance) => FindWhere;
export const createFindWhere: CreateFindWhere =
    (axios) =>
    (collection) =>
    async ({ where, pagination, sort, depth }) => {
        const queryString = createQuery({
            where: where,
            limit: pagination?.limit,
            page: pagination?.page,
            depth: depth ?? 0,
            sort: sort
        });
        const endpoint = `/api/${collection}${queryString}`;

        return axios
            .get<PaginatedDocs<PayloadCollection<typeof collection>>>(endpoint)
            .then(extracting("data"));
    };
