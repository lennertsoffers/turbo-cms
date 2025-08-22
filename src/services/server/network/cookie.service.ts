import {
    fromNullable,
    Maybe
} from "@sweet-monads/maybe";
import {
    RequestCookie,
    ResponseCookie
} from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

import { CookieEnum } from "@/types/domain/network/cookie.enum";

type GetCookie = (name: CookieEnum) => Promise<Maybe<RequestCookie>>;
export const getCookie: GetCookie = async (name) => {
    const resolvedCookies = await cookies();

    return fromNullable(
        resolvedCookies.get(name)
    );
};

type SetCookie = (
    cookie: {
        name: CookieEnum;
        value: string;
    } & Omit<Partial<ResponseCookie>, "name" | "value">
) => Promise<void>;
export const setCookie: SetCookie = async (cookie) => {
    const resolvedCookies = await cookies();

    resolvedCookies.set(cookie);
};

type DeleteCookie = (name: CookieEnum) => Promise<void>;
export const deleteCookie: DeleteCookie = async (name) => {
    const resolvedCookies = await cookies();

    resolvedCookies.delete(name);
};
