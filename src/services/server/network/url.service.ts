import { Maybe } from "@sweet-monads/maybe";

import { Header } from "@/types/domain/network/header.enum";

import * as HeaderService from "./header.service";

type GetUrl = () => Promise<Maybe<string>>;
export const getUrl: GetUrl = () => HeaderService.getHeader(Header.X_URL);

type GetSearchParams = () => Promise<URLSearchParams>;
export const getSearchParams: GetSearchParams = async () => {
    const url = await getUrl();

    return url
        .map(
            (str) => str
                .split("?")
                .pop()
                ?? ""
        )
        .map((searchParams) => new URLSearchParams(searchParams))
        .unwrapOr(new URLSearchParams());
};
