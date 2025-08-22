import classNames from "classnames";
import { ComponentProps } from "react";

import { RadioField } from "@/components/atoms/client/form/radio-field/radio-field";
import { FieldErrors } from "@/components/atoms/shared/form/field-errors/field-errors";
import { FieldLabel } from "@/components/atoms/shared/form/field-label/field-label";

import styles from "./form-radio-field.module.scss";

type FormRadioFieldProps = {
    className?: string;
    label?: string;
    errors?: string[];
} & Omit<ComponentProps<typeof RadioField>, "className">;

export const FormRadioField = ({
    className,
    label,
    errors,
    ...radioFieldProps
}: FormRadioFieldProps) => {
    return (
        <p className={classNames(
            styles["form-radio-field"],
            className
        )}
        >
            {!!label && (
                <FieldLabel>
                    {label}
                </FieldLabel>
            )}
            <RadioField {...radioFieldProps} />
            <FieldErrors errors={errors} />
        </p>
    );
};
