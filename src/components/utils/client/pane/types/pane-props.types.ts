import { ReactNode } from "react";

import { IconComponent } from "@/types/domain/__TODO__/icon.component";

import { PaneComponentType } from "../enums/pane-component-type.enum";

export type AsidePaneProps = {
    type: typeof PaneComponentType.ASIDE;
    children: ReactNode | undefined;
};

export type FormPaneProps<TState> = {
    type: typeof PaneComponentType.FORM;
    initialState: Awaited<TState>;
    SubmitButtonIcon: IconComponent;
    submitButtonText: string;
    cancelButtonText: string;
    children: (props: {
        formState: TState;
        formPending: boolean;
    }) => ReactNode;
    action: (state: Awaited<TState>, payload: FormData) => Promise<TState> | TState;
};
