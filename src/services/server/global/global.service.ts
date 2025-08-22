import {
    fromNullable,
    Maybe
} from "@sweet-monads/maybe";
import {
    GeneratedTypes,
    GlobalSlug
} from "payload";

import { Turbo } from "@/turbo";

type GetGlobal = <TGlobal extends GlobalSlug>(
    slug: TGlobal
) => Promise<Maybe<GeneratedTypes["globals"][TGlobal]>>;

export const getGlobal: GetGlobal = async (slug) => {
    const payload = await Turbo.getPayload();

    const global = await payload.findGlobal({
        slug: slug
    });

    return fromNullable(global);
};
