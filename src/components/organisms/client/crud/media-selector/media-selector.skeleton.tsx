import { MediaCardSkeleton } from "@/components/atoms/shared/crud/media-card/media-card.skeleton";

import styles from "./media-selector.module.scss";

type MediaSelectorSkeletonProps = {};

export const MediaSelectorSkeleton = ({}: MediaSelectorSkeletonProps) => {
    return (
        <ul className={styles["media-selector__medias"]}>
            <MediaCardSkeleton />
            <MediaCardSkeleton />
            <MediaCardSkeleton />
            <MediaCardSkeleton />
            <MediaCardSkeleton />
        </ul>
    );
};
