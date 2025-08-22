import { PayloadError } from "../../../error/payload-error.types";

export type PayloadErrorResponse = {
    errors: PayloadError[];
};
