import {
    fromNullable,
    Maybe,
    none
} from "@sweet-monads/maybe";

import { Page } from "@/config/payload/payload.types";
import { Turbo } from "@/turbo";
import { Id } from "@/types/domain/id.types";
import { isDefined } from "@/utils/general/object.utils";

type GetRootPages = () => Promise<Page[]>;
export const getRootPages: GetRootPages = async () => {
    const payload = await Turbo.getPayload();

    const pages = await payload.find({
        collection: "pages",
        pagination: false,
        depth: 100,
        where: {
            root: {
                equals: true
            }
        }
    });

    return pages.docs;
};

type GetPageById = (id: Id) => Promise<Maybe<Page>>;
export const getPageById: GetPageById = async (id) => {
    if(!isDefined(id)) return none();

    const payload = await Turbo.getPayload();

    const page = await payload.findByID({
        collection: "pages",
        id: id,
        depth: 100
    });

    return fromNullable(page);
};
