import classNames from "classnames";
import {
    ComponentProps,
    ReactNode
} from "react";

import styles from "./field-label.module.scss";

type FieldLabelProps = {
    children: ReactNode;
} & ComponentProps<"label">;

export const FieldLabel = ({
    className,
    children,
    ...labelProps
}: FieldLabelProps) => {
    return (
        <label
            className={classNames(
                styles["field-label"],
                className
            )}
            {...labelProps}
        >
            {children}
        </label>
    );
};
