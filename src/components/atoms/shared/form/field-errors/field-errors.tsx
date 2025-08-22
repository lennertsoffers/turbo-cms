import { isEmpty } from "@/utils/general/array.utils";
import { isDefined } from "@/utils/general/object.utils";

import styles from "./field-errors.module.scss";

type FieldErrorsProps = {
    errors?: string[];
    id?: string;
};

export const FieldErrors = ({
    id,
    errors
}: FieldErrorsProps) => {
    if(!isDefined(errors)) return null;
    if(isEmpty(errors)) return null;

    return (
        <span
            className={styles["field-errors"]}
            id={id}
        >
            {errors.map((error) => (
                <span
                    className={styles["field-errors__error"]}
                    key={error}
                >
                    {error}
                </span>
            ))}
        </span>
    );
};
