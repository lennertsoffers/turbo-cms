import classNames from "classnames";
import { HTMLProps } from "react";

import { Media } from "@/config/payload/payload.types";

import { MediaCardElementType } from "./enums/media-card-element-type.enum";

import styles from "./media-card.module.scss";

type MediaCardProps = (
    (
        {
            elementType: typeof MediaCardElementType.LI;
        }
        & Omit<HTMLProps<HTMLLIElement>, "media">
    ) | (
        {
            elementType: typeof MediaCardElementType.SECTION;
        }
        & Omit<HTMLProps<HTMLElement>, "media">
    )
) & {
    media: Media;
    active?: boolean;
};

export const MediaCard = ({
    media,
    active = false,
    elementType,
    ref,
    className,
    ...htmlProps
}: MediaCardProps) => {
    const props = {
        ...htmlProps,
        className: classNames(
            styles["media-card"],
            active && styles["media-card--active"],
            className
        )
    };

    const Content = (
        <>
            <img
                className={styles["media-card__image"]}
                src={media.sizes?.thumbnail?.url ?? media.url}
            />
            <p className={styles["media-card__name"]}>
                {media.name}
            </p>
        </>
    );

    return elementType === MediaCardElementType.LI
        ? (
            <li
                {...props}
                ref={ref}
            >
                {Content}
            </li>
        )
        : (
            <section
                {...props}
                ref={ref}
            >
                {Content}
            </section>
        );
};
