import { FieldAccess } from "payload";

import { RoleEnum } from "../role.enum";

type IsLoggedIn = FieldAccess;
export const isLoggedIn: IsLoggedIn = ({ req }) => !!req.user;

type HasRole = (role: RoleEnum) => FieldAccess;
export const hasRole: HasRole =
    (role) =>
    ({ req }) =>
        req.user?.role === role;
