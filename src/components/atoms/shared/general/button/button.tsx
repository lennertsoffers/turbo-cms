import classNames from "classnames";
import {
    ComponentProps,
    ReactElement,
    ReactNode
} from "react";

import { IconComponent } from "@/types/domain/__TODO__/icon.component";
import { Color } from "@/types/domain/style/color.types";
import { isDefined } from "@/utils/general/object.utils";

import {
    ButtonIconPosition,
    ButtonIconPositionEnum
} from "./enums/button-icon-position.enum";
import {
    ButtonSize,
    ButtonSizeEnum
} from "./enums/button-size.enum";
import { ButtonVariantEnum } from "./enums/button-variant.enum";

import styles from "./button.module.scss";

type ButtonProps = {
    color: Color;
    variant: ButtonVariantEnum;
    size?: ButtonSizeEnum;
    loading?: boolean;
    iconPosition?: ButtonIconPositionEnum;
    Icon?: IconComponent | ReactElement;
    children?: ReactNode | undefined;
} & ComponentProps<"button">;

export const Button = ({
    color,
    variant,
    size = ButtonSize.MD,
    type = "button",
    loading,
    iconPosition,
    Icon,
    children,
    ...buttonProps
}: ButtonProps) => {
    const colorClass = styles[`button--color--${color}`];

    const sizeClass = styles[`button--size--${size}`];

    const variantClass = styles[`button--variant--${variant}`];

    const stateClass = buttonProps.disabled
        ? styles["button--state--disabled"]
        : loading
            ? styles["button--state--loading"]
            : undefined;

    const RenderedIcon = typeof Icon === "function"
        ? <Icon />
        : Icon;

    return (
        <button
            {...buttonProps}
            className={classNames(
                buttonProps.className,
                styles["button"],
                colorClass,
                sizeClass,
                variantClass,
                stateClass
            )}
            disabled={loading || buttonProps.disabled}
            type={type}
        >
            {isDefined(Icon) && iconPosition === ButtonIconPosition.BEFORE && (
                <span className={"button__icon--before"}>
                    {RenderedIcon}
                </span>
            )}
            <span>
                {children}
            </span>
            {isDefined(Icon) && iconPosition === ButtonIconPosition.AFTER && (
                <span className={"button__icon--after"}>
                    {RenderedIcon}
                </span>
            )}
        </button>
    );
};
