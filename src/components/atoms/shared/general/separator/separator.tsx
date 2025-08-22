import classNames from "classnames";

import { SeparatorDirectionEnum } from "./enums/separator-direction.enum";
import { Points } from "./separator.config";

import styles from "./separator.module.scss";

type SeparatorProps = {
    direction: SeparatorDirectionEnum;
    className?: string;
};

export const Separator = ({ direction, className }: SeparatorProps) => {
    const { x1, y1, x2, y2, width, height } = Points[direction];

    return (
        <svg
            className={classNames(
                className,
                styles["separator"]
            )}
            height={height}
            width={width}
        >
            <line
                className={styles["separator__line"]}
                x1={x1}
                x2={x2}
                y1={y1}
                y2={y2}
            />
        </svg>
    );
};
