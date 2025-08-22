import { Access } from "payload";

import { isDefined } from "@/utils/general/object.utils";

import { RoleEnum } from "../role.enum";

type IsLoggedIn = Access;
export const isLoggedIn: IsLoggedIn = ({ req }) => isDefined(req.user);

type HasRole = (role: RoleEnum) => Access;
export const hasRole: HasRole =
    (role) =>
    ({ req }) =>
        req.user?.role === role;
