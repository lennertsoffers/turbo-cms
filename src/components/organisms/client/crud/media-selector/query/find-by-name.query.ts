import { PaginatedDocs } from "payload";

import { Media } from "@/config/payload/payload.types";
import { PayloadClient } from "@/payload/api/api.rest";

import { PAGE_SIZE } from "../config/find-by-name.config";

type FindByName =
    (name: string) =>
    ({ pageParam }: { pageParam: number; }) => Promise<PaginatedDocs<Media>>;
export const findByName: FindByName =
    (name) =>
    ({ pageParam }) => PayloadClient.findWhere("medias")({
        where: {
            name: {
                contains: name
            }
        },
        pagination: {
            limit: PAGE_SIZE,
            page: pageParam
        },
        depth: 0
    });

