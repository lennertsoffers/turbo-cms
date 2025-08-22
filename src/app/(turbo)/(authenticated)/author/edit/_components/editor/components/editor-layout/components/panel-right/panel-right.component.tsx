"use client";

import classNames from "classnames";

import { ComponentModel } from "@turbo-cms/core/types/config/components/component.model";
import { isDefined } from "@turbo-cms/utils-general/object";

import { FieldConfigFormLabel } from "./components/field-config-form-label/field-config-form-label.container";
import { FieldConfigForm } from "./components/field-config-form/field-config-form.container";
import { VariablesConfigForm } from "./components/variables-config-form/variables-config-form.container";

import styles from "./panel-right.module.scss";

type PanelRightComponentProps = {
    className?: string;
    selectedComponent?: ComponentModel;
};

export const PanelRightComponent = ({
    className,
    selectedComponent
}: PanelRightComponentProps) => {
    const hasSelection = isDefined(selectedComponent);

    return (
        <div className={classNames(
            className,
            styles["panel-right"]
        )}
        >
            {hasSelection && (
                <>
                    <FieldConfigFormLabel
                        fieldName={selectedComponent.name}
                        title={true}
                    />
                    <FieldConfigForm selectedComponent={selectedComponent} />
                </>
            )}
            {!hasSelection && (
                <VariablesConfigForm />
            )}
        </div>
    );
};
