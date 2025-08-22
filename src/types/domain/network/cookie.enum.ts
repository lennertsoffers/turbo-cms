import { Enum } from "@/utils/type/enum.utils";

export const Cookie = {
    LANGUAGE: "payload-lng",
    TOKEN: "payload-token",
    PANELS_LAYOUT_AUTHOR: "panels-layout-author"
} as const;

export type CookieEnum = Enum<typeof Cookie>;
