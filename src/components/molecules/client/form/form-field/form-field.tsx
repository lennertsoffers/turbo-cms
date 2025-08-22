import classNames from "classnames";
import {
    ComponentProps,
    useId
} from "react";

import { InputField } from "@/components/atoms/client/form/input-field/input-field";
import { FieldErrors } from "@/components/atoms/shared/form/field-errors/field-errors";
import { FieldLabel } from "@/components/atoms/shared/form/field-label/field-label";
import { IconComponent } from "@/types/domain/__TODO__/icon.component";
import { isNotEmpty } from "@/utils/general/array.utils";
import { isDefined } from "@/utils/general/object.utils";

import {
    FormFieldIconPosition,
    FormFieldIconPositionEnum
} from "./enums/form-field-icon-position.enum";

import styles from "./form-field.module.scss";

type FormFieldProps = {
    className?: string;
    label?: string;
    errors?: string[];
    iconPosition?: FormFieldIconPositionEnum;
    Icon?: IconComponent;
} & Omit<ComponentProps<"input">, "children" | "className">;

export const FormField = ({
    className,
    label,
    errors,
    iconPosition,
    Icon,
    ...inputProps
}: FormFieldProps) => {
    const inputElementId = useId();
    const errorElementId = useId();

    const ariaErrorMessage = isNotEmpty(errors)
        ? errorElementId
        : undefined;

    return (
        <p className={classNames(
            styles["form-field"],
            className
        )}
        >
            {!!label && (
                <FieldLabel htmlFor={inputElementId}>
                    {label}
                </FieldLabel>
            )}
            <InputField.Root>
                {isDefined(Icon) && iconPosition === FormFieldIconPosition.BEFORE && <Icon className={styles["form-field__icon"]} />}
                <InputField.Input
                    aria-errormessage={ariaErrorMessage}
                    id={inputElementId}
                    {...inputProps}
                />
                {isDefined(Icon) && iconPosition === FormFieldIconPosition.AFTER && <Icon className={styles["form-field__icon"]} />}
            </InputField.Root>
            <FieldErrors
                errors={errors}
                id={errorElementId}
            />
        </p>
    );
};
