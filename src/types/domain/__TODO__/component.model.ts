import { Id } from "@/types/domain/id.types";

import { DefaultProps } from "./component-config.model";

export type ComponentModel = {
    id: Id;
    name: string;
    props: DefaultProps;
    children: ComponentModel[];
};
