"use client";

import {
    JoinStraightIcon,
    SquareIcon
} from "hugeicons-react";
import { RefObject } from "react";

import { DefaultProps } from "@turbo-cms/core/types/config/components/component-config.model";
import { VariableType } from "@turbo-cms/types-models/author/variable-type.enum";

import { FieldConfigFormLabel } from "../../../field-config-form-label/field-config-form-label.container";
import { FieldConfigFormToggle } from "../../../field-config-form-toggle/field-config-form-toggle.container";
import {
    VariableInputChangeValueHandler,
    VariableInputField
} from "../../../variable-input-field/variable-input-field.container";

import styles from "./field-config-form-corner-radius.module.scss";

type FieldConfigFormCornerRadiusComponentProps = {
    defaultProps: DefaultProps;
    individualCorners: boolean;
    allInputRef: RefObject<HTMLInputElement | null>;
    topLeftInputRef: RefObject<HTMLInputElement | null>;
    topRightInputRef: RefObject<HTMLInputElement | null>;
    bottomLeftInputRef: RefObject<HTMLInputElement | null>;
    bottomRightInputRef: RefObject<HTMLInputElement | null>;
    createHandleOnVariableInputChange: (
        field: string
    ) => VariableInputChangeValueHandler<typeof VariableType.TEXT>;
    onToggleMore: (more: boolean) => void;
};

export const FieldConfigFormCornerRadiusComponent = ({
    defaultProps,
    individualCorners,
    allInputRef,
    topLeftInputRef,
    topRightInputRef,
    bottomLeftInputRef,
    bottomRightInputRef,
    onToggleMore,
    createHandleOnVariableInputChange
}: FieldConfigFormCornerRadiusComponentProps) => {
    const handleOnToggleMore = onToggleMore;

    return (
        <div>
            <FieldConfigFormLabel fieldName={"corner radius"} />
            <div className={styles["field-config-form-corner-radius"]}>
                <div className={styles["field-config-form-corner-radius__inputs"]}>
                    {individualCorners && (
                        <div className={styles["corner-radius__individual"]}>
                            <div className={styles["corner-radius__individual__row"]}>
                                <VariableInputField<typeof VariableType.TEXT>
                                    Icon={JoinStraightIcon}
                                    ref={topLeftInputRef}
                                    tooltip={"top left"}
                                    variableType={VariableType.TEXT}
                                    onVariableInputChange={createHandleOnVariableInputChange("cornerTopLeftRadius")}
                                />
                                <VariableInputField<typeof VariableType.TEXT>
                                    Icon={JoinStraightIcon}
                                    ref={topRightInputRef}
                                    tooltip={"top right"}
                                    variableType={VariableType.TEXT}
                                    onVariableInputChange={createHandleOnVariableInputChange("cornerTopRightRadius")}
                                />
                            </div>
                            <div className={styles["corner-radius__individual__row"]}>
                                <VariableInputField<typeof VariableType.TEXT>
                                    Icon={JoinStraightIcon}
                                    ref={bottomLeftInputRef}
                                    tooltip={"bottom left"}
                                    variableType={VariableType.TEXT}
                                    onVariableInputChange={createHandleOnVariableInputChange("cornerBottomLeftRadius")}
                                />
                                <VariableInputField<typeof VariableType.TEXT>
                                    Icon={JoinStraightIcon}
                                    ref={bottomRightInputRef}
                                    tooltip={"bottom right"}
                                    variableType={VariableType.TEXT}
                                    onVariableInputChange={createHandleOnVariableInputChange("cornerBottomRightRadius")}
                                />
                            </div>
                        </div>
                    )}
                    {!individualCorners && (
                        <VariableInputField<typeof VariableType.TEXT>
                            Icon={JoinStraightIcon}
                            ref={allInputRef}
                            tooltip={"all corners"}
                            variableType={VariableType.TEXT}
                            onVariableInputChange={createHandleOnVariableInputChange("cornerAllRadius")}
                        />
                    )}
                </div>
                <FieldConfigFormToggle
                    Icon={SquareIcon}
                    tooltip={"edit individual corners"}
                    onToggleMore={handleOnToggleMore}
                />
            </div>
        </div>
    );
};
