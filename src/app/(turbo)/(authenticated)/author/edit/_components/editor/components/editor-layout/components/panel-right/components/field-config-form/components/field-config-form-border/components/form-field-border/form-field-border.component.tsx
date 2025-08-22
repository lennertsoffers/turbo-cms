"use client";

import * as Tooltip from "@radix-ui/react-tooltip";
import classNames from "classnames";

import { Separator } from "@turbo-cms/components-general/shared/spacing/separator";
import { IconComponent } from "@turbo-cms/types-components/components/icon";

import styles from "./form-field-border.module.scss";

type FormFieldBorderComponentProps = {
    Icon: IconComponent;
    BorderStyleOptions: JSX.Element[];
};

export const FormFieldBorderComponent = ({
    Icon,
    BorderStyleOptions
}: FormFieldBorderComponentProps) => {
    return (
        <span className={styles["form-field-border"]}>
            <Tooltip.Provider>
                <Tooltip.Root>
                    <Tooltip.Trigger asChild={true}>
                        <Icon className={styles["form-field-border__icon"]} />
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                        <Tooltip.Content
                            className={styles["form-field-border__tooltip"]}
                            sideOffset={5}
                        >
                            {"border width - colour - style"}
                            <Tooltip.Arrow className={styles["form-field-border__tooltip__arrow"]} />
                        </Tooltip.Content>
                    </Tooltip.Portal>
                </Tooltip.Root>
            </Tooltip.Provider>
            <Tooltip.Provider>
                <Tooltip.Root>
                    <Tooltip.Trigger asChild={true}>
                        <input
                            className={classNames(
                                styles["form-field-border__input"],
                                styles["form-field-border__element"]
                            )}
                            type={"number"}
                        />
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                        <Tooltip.Content
                            className={styles["form-field-border__tooltip"]}
                            sideOffset={5}
                        >
                            {"border width"}
                            <Tooltip.Arrow className={styles["form-field-border__tooltip__arrow"]} />
                        </Tooltip.Content>
                    </Tooltip.Portal>
                </Tooltip.Root>
            </Tooltip.Provider>
            <Separator
                className={styles["form-field-border__separator"]}
                direction={"vertical"}
            />
            <Tooltip.Provider>
                <Tooltip.Root>
                    <Tooltip.Trigger asChild={true}>
                        <input
                            className={classNames(
                                styles["form-field-border__input"],
                                styles["form-field-border__element"]
                            )}
                            type={"text"}
                        />
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                        <Tooltip.Content
                            className={styles["form-field-border__tooltip"]}
                            sideOffset={5}
                        >
                            {"border colour"}
                            <Tooltip.Arrow className={styles["form-field-border__tooltip__arrow"]} />
                        </Tooltip.Content>
                    </Tooltip.Portal>
                </Tooltip.Root>
            </Tooltip.Provider>
            <Separator
                className={styles["form-field-border__separator"]}
                direction={"vertical"}
            />
            <Tooltip.Provider>
                <Tooltip.Root>
                    <Tooltip.Trigger asChild={true}>
                        <select className={classNames(
                            styles["form-field-border__select"],
                            styles["form-field-border__element"]
                        )}
                        >
                            {BorderStyleOptions}
                        </select>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                        <Tooltip.Content
                            className={styles["form-field-border__tooltip"]}
                            sideOffset={5}
                        >
                            {"border style"}
                            <Tooltip.Arrow className={styles["form-field-border__tooltip__arrow"]} />
                        </Tooltip.Content>
                    </Tooltip.Portal>
                </Tooltip.Root>
            </Tooltip.Provider>
        </span>
    );
};
