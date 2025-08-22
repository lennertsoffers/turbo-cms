import { NO_CONTENT } from "http-status";
import { NextResponse } from "next/server";

import * as CookieService from "@turbo-cms/services/server/network/cookie.service";
import { Cookie } from "@turbo-cms/types-models/network/cookie.enum";

export const POST = async (): Promise<NextResponse> => {
    CookieService.deleteCookie(Cookie.TOKEN);

    return new NextResponse(
        null,
        {
            status: NO_CONTENT
        }
    );
};
