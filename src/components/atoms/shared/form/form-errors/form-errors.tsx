import { isEmpty } from "@/utils/general/array.utils";
import { isDefined } from "@/utils/general/object.utils";

import styles from "./form-errors.module.scss";

type FormErrorsProps = {
    errors?: string[];
};

export const FormErrors = ({ errors }: FormErrorsProps) => {
    if(!isDefined(errors)) return null;
    if(isEmpty(errors)) return null;

    return (
        <p className={styles["form-errors"]}>
            {errors.map((error) => (
                <span
                    className={styles["form-errors__error"]}
                    key={error}
                >
                    {error}
                </span>
            ))}
        </p>
    );
};
