"use client";

import {
    Blockchain01Icon,
    HierarchySquare01Icon
} from "hugeicons-react";

import { FormFieldRadioToggle } from "@turbo-cms/components-general/client/form/form-field-radio-toggle";

import {
    PanelLeftContentType,
    PanelLeftContentTypeEnum
} from "../../enums/panel-left-content-type.enum";

import styles from "./panel-content-toggle.module.scss";

type PanelContentToggleComponentProps = {
    onSelect: (value: PanelLeftContentTypeEnum) => void;
};

export const PanelContentToggleComponent = ({ onSelect }: PanelContentToggleComponentProps) => {
    const handleOnSelect = onSelect;

    return (
        <FormFieldRadioToggle<typeof PanelLeftContentType>
            options={[
                {
                    Icon: HierarchySquare01Icon,
                    value: PanelLeftContentType.STRUCTURE,
                    label: "structure"
                },
                {
                    Icon: Blockchain01Icon,
                    value: PanelLeftContentType.COMPONENTS,
                    label: "components",
                    defaultChecked: true
                }
            ]}
            className={styles["panel-content-toggle"]}
            name={"type"}
            onSelect={handleOnSelect}
        />
    );
};
