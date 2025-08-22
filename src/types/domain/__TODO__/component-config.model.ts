import {
    JSX,
    ReactElement
} from "react";

import { Id } from "@/types/domain/id.types";

import { ComponentModel } from "./component.model";
import { FieldConfigModel } from "./field-config.model";

export type VariableProp = {
    type: "variable";
    id: Id;
};

export type ValueProp<TValue> = {
    type: "value";
    value: TValue;
};

export type Prop<TValue> = ValueProp<TValue> | VariableProp;

export type DefaultProps = Record<string, Prop<any>>;

export type DefaultComponentMapProps = Record<string, DefaultProps>;

export type Render<TProps> = (props: TProps) => Promise<ReactElement> | ReactElement | null;

export type TurboCmsPropsModel = {
    renderZone: Render<{ id: Id; }>;
    component: ComponentModel;
};

export type WithTurboCmsProps<TProps extends object> = {
    turboCms: TurboCmsPropsModel;
} & TProps;

export type ComponentConfigModel<TProps extends DefaultProps = DefaultProps> = {
    label: string;
    fields: Record<keyof TProps, FieldConfigModel>;
    defaultProps: TProps;
    Icon: JSX.Element;
    category: string;
    hasDropZone: boolean;
    renderPublisher: Render<WithTurboCmsProps<TProps>>;
    renderAuthor: Render<WithTurboCmsProps<TProps>>;
};

export type ComponentMapConfigModel<
    TPropsMap extends DefaultComponentMapProps = DefaultComponentMapProps
> = {
    [ComponentName in keyof TPropsMap]: ComponentConfigModel<TPropsMap[ComponentName]>;
};
