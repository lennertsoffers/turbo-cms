import { PayloadClient } from "@/payload/api/api.rest";
import {
    extracting,
    mapping
} from "@/utils/general/array.utils";

import { PAGE_SIZE } from "../config/page-path-autocomplete.config";

type GetPagePathAutocomplete =
    (path: string) =>
    () => Promise<string[]>;
export const getPagePathAutocomplete: GetPagePathAutocomplete =
    (path) =>
    () => PayloadClient.findWhere("pages")({
        where: {
            path: {
                contains: path
            }
        },
        pagination: {
            limit: PAGE_SIZE,
            page: 0
        },
        depth: 0
    })
        .then(extracting("docs"))
        .then(mapping(extracting("path")));

