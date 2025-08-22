"use client";

import {
    useRef,
    useState
} from "react";

import { ComponentMapConfig } from "@turbo-cms/core/config/components/component-map.config";
import {
    entries,
    isDefined
} from "@turbo-cms/utils-general/object";

import { ComponentSelectorComponent } from "./component-selector.component";

type ComponentSelectorProps = {};

export const ComponentSelector = ({}: ComponentSelectorProps) => {
    const queryInputRef = useRef<HTMLInputElement | null>(null);

    const [
        query,
        setQuery
    ] = useState<string | undefined>(undefined);

    const [
        categories,
        _setCategories
    ] = useState<string[] | undefined>(undefined);

    const components = entries(ComponentMapConfig)
        .filter(([
            name,
            { category }
        ]) => (
            isDefined(categories)
                ? categories.includes(category)
                : true
        ) && (
            query
                ? name.includes(query)
                : true
        ))
        .map(([
            name,
            component
        ]) => ({
            name: name,
            label: component.label,
            category: component.category,
            Icon: component.Icon
        }));

    const handleOnQueryInputChange = () => {
        if(queryInputRef.current?.value === query) return;

        setQuery(queryInputRef.current?.value);
    };

    return (
        <>
            <ComponentSelectorComponent
                components={components}
                queryInputRef={queryInputRef}
                onQueryInputChange={handleOnQueryInputChange}
            />
        </>
    );
};
