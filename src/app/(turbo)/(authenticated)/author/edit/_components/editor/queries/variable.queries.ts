import { Variable } from "@turbo-cms/config/payload/payload.types";
import { PayloadClient } from "@turbo-cms/payload/api/rest";
import { extracting } from "@turbo-cms/utils-general/array";

type GetVariables = () => Promise<Variable[]>;
export const getVariables: GetVariables = () => PayloadClient
    .findWhere("variables")({
        pagination: {
            page: 0,
            // TODO - Implement proper pagination
            limit: 1000
        },
        sort: "createdAt"
    })
    .then(extracting("docs"));
