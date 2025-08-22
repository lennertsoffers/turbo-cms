import { Enum } from "@/utils/type/enum.utils";

export const Role = {
    MASTER: "master",
    OWNER: "owner",
    ADMIN: "admin",
    AUTHOR: "author",
    VISITOR: "visitor"
} as const;

export type RoleEnum = Enum<typeof Role>;
