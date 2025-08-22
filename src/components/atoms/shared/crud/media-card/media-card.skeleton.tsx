import classNames from "classnames";

import styles from "./media-card.module.scss";

type MediaCardSkeletonProps = {
    className?: string;
};

export const MediaCardSkeleton = ({ className }: MediaCardSkeletonProps) => {
    return (
        <section className={
            classNames(
                styles["media-card"],
                className
            )
        }
        >
            <div className={styles["media-card__image"]} />
            <p className={styles["media-card__name"]}>
                <span className={styles["media-card__name__skeleton"]} />
            </p>
        </section>
    );
};
