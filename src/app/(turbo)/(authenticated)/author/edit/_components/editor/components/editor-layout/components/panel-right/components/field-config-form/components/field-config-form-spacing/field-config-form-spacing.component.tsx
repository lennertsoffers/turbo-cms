"use client";

import {
    FlipBottomIcon,
    FlipHorizontalIcon,
    FlipLeftIcon,
    FlipRightIcon,
    FlipTopIcon,
    FlipVerticalIcon,
    SquareIcon
} from "hugeicons-react";

import { FormIconField } from "@turbo-cms/components-general/client/form/form-icon-field";

import { FieldConfigFormLabel } from "../../../field-config-form-label/field-config-form-label.container";
import { FieldConfigFormToggle } from "../../../field-config-form-toggle/field-config-form-toggle.container";

import styles from "./field-config-form-spacing.module.scss";

type FieldConfigFormSpacingComponentProps = {
    individualSpacing: boolean;
    onToggleMore: (more: boolean) => void;
};

export const FieldConfigFormSpacingComponent = ({
    individualSpacing,
    onToggleMore
}: FieldConfigFormSpacingComponentProps) => {
    const handleOnToggleMore = onToggleMore;

    return (
        <div>
            <FieldConfigFormLabel fieldName={"spacing"} />
            <div className={styles["field-config-form-spacing"]}>
                <div className={styles["field-config-form-spacing__inputs"]}>
                    {!individualSpacing && (
                        <div className={styles["field-config-form-spacing__row"]}>
                            <FormIconField
                                Icon={FlipHorizontalIcon}
                                tooltip={"horizontal spacing"}
                                type={"text"}
                                wrapperClassName={styles["field-config-form-spacing__row__element"]}
                            />
                            <FormIconField
                                Icon={FlipVerticalIcon}
                                tooltip={"vertical spacing"}
                                type={"text"}
                                wrapperClassName={styles["field-config-form-spacing__row__element"]}
                            />
                        </div>
                    )}
                    {individualSpacing && (
                        <>
                            <div className={styles["field-config-form-spacing__row"]}>
                                <FormIconField
                                    Icon={FlipBottomIcon}
                                    tooltip={"spacing top"}
                                    type={"text"}
                                    wrapperClassName={styles["field-config-form-spacing__row__element"]}
                                />
                                <FormIconField
                                    Icon={FlipTopIcon}
                                    tooltip={"spacing bottom"}
                                    type={"text"}
                                    wrapperClassName={styles["field-config-form-spacing__row__element"]}
                                />
                            </div>
                            <div className={styles["field-config-form-spacing__row"]}>
                                <FormIconField
                                    Icon={FlipRightIcon}
                                    tooltip={"spacing left"}
                                    type={"text"}
                                    wrapperClassName={styles["field-config-form-spacing__row__element"]}
                                />
                                <FormIconField
                                    Icon={FlipLeftIcon}
                                    tooltip={"spacing right"}
                                    type={"text"}
                                    wrapperClassName={styles["field-config-form-spacing__row__element"]}
                                />
                            </div>
                        </>
                    )}
                </div>
                <FieldConfigFormToggle
                    Icon={SquareIcon}
                    tooltip={"edit individual sides"}
                    onToggleMore={handleOnToggleMore}
                />
            </div>
        </div>
    );
};
