import {
    fromNullable,
    Maybe
} from "@sweet-monads/maybe";
import { headers } from "next/headers";

import { HeaderEnum } from "@/types/domain/network/header.enum";

type GetHeader = (header: HeaderEnum) => Promise<Maybe<string>>;
export const getHeader: GetHeader = async (header) => {
    const resolvedHeaders = await headers();

    return fromNullable(
        resolvedHeaders.get(header)
    );
};
