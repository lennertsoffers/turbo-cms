import classNames from "classnames";
import { default as NextLink } from "next/link";
import {
    ComponentProps,
    ReactElement,
    ReactNode
} from "react";

import { IconComponent } from "@/types/domain/__TODO__/icon.component";
import { Color } from "@/types/domain/style/color.types";
import { isDefined } from "@/utils/general/object.utils";

import {
    LinkIconPosition,
    LinkIconPositionEnum
} from "./enums/link-icon-position.enum";
import {
    LinkSize,
    LinkSizeEnum
} from "./enums/link-size.enum";
import { LinkVariantEnum } from "./enums/link-variant.enum";

import styles from "./link.module.scss";

type LinkProps = {
    color: Color;
    variant: LinkVariantEnum;
    size?: LinkSizeEnum;
    disabled?: boolean;
    iconPosition?: LinkIconPositionEnum;
    Icon?: IconComponent | ReactElement;
    children?: ReactNode | undefined;
} & ComponentProps<typeof NextLink>;

export const Link = ({
    color,
    variant,
    size = LinkSize.MD,
    disabled,
    iconPosition = LinkIconPosition.BEFORE,
    Icon,
    children,
    ...linkProps
}: LinkProps) => {
    const colorClass = styles[`link--color--${color}`];

    const sizeClass = styles[`link--size--${size}`];

    const variantClass = styles[`link--variant--${variant}`];

    const stateClass = disabled
        ? styles["link--state--disabled"]
        : undefined;

    const RenderedIcon = typeof Icon === "function"
        ? <Icon />
        : Icon;

    return (
        <NextLink
            {...linkProps}
            className={classNames(
                linkProps.className,
                styles["link"],
                colorClass,
                sizeClass,
                variantClass,
                stateClass
            )}
        >
            {isDefined(Icon) && iconPosition === LinkIconPosition.BEFORE && (
                <span className={"link__icon--before"}>
                    {RenderedIcon}
                </span>
            )}
            <span>
                {children}
            </span>
            {isDefined(Icon) && iconPosition === LinkIconPosition.AFTER && (
                <span className={"link__icon--after"}>
                    {RenderedIcon}
                </span>
            )}
        </NextLink>
    );
};
