import { Enum } from "@/utils/type/enum.utils";

export const Header = {
    ACCEPT_LANGUAGE: "accept-language",
    X_URL: "x-url"
} as const;

export type HeaderEnum = Enum<typeof Header>;
