"use client";

import { RefObject } from "react";

import { FormField } from "@/components/molecules/client/form/form-field/form-field";

import { Component } from "./components/component/component.container";

import styles from "./component-selector.module.scss";

type ComponentSelectorComponentProps = {
    components: {
        name: string;
        label: string;
        category: string;
        Icon: JSX.Element;
    }[];
    onQueryInputChange: () => void;
    queryInputRef: RefObject<HTMLInputElement | null>;
};

export const ComponentSelectorComponent = ({
    components,
    onQueryInputChange,
    queryInputRef
}: ComponentSelectorComponentProps) => {
    const handleOnQueryInputChange = onQueryInputChange;

    return (
        <>
            <FormField
                ref={queryInputRef}
                onChange={handleOnQueryInputChange}
            />

            <ul className={styles["component-selector__components"]}>
                {components.map((component) => (
                    <Component
                        Icon={component.Icon}
                        key={component.name}
                        name={component.name}
                    />
                ))}
            </ul>
        </>
    );
};
