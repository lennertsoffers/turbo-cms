import {
    fromNullable,
    Maybe
} from "@sweet-monads/maybe";

import { User } from "@/config/payload/payload.types";
import { extracting } from "@/utils/general/array.utils";
import { isDefined } from "@/utils/general/object.utils";

import * as AuthenticationService from "../authentication/authentication.service";

type GetUser = () => Promise<User>;
export const getUser: GetUser = async () => {
    const { user } = await AuthenticationService.getAuthentication();

    if(!isDefined(user)) {
        // TODO - Implement proper error handling
        throw new Error("You are not authenticated!");
    }

    return user;
};

type GetMaybeUser = () => Promise<Maybe<User>>;
export const getMaybeUser: GetMaybeUser = async () =>
    AuthenticationService.getAuthentication()
        .then(extracting("user"))
        .then(fromNullable);
