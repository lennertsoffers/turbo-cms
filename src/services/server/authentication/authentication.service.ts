import { headers } from "next/headers";
import { Payload } from "payload";

import { Turbo } from "@/turbo";
import { extracting } from "@/utils/general/array.utils";
import { isDefined } from "@/utils/general/object.utils";

type GetAuthentication = () => ReturnType<Payload["auth"]>;
export const getAuthentication: GetAuthentication = async () => {
    const payload = await Turbo.getPayload();
    const resolvedHeaders = await headers();

    return payload.auth({
        headers: resolvedHeaders
    });
};

type IsLoggedIn = () => Promise<boolean>;
export const isLoggedIn: IsLoggedIn = async () =>
    getAuthentication()
        .then(extracting("user"))
        .then(isDefined);
