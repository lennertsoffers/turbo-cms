import { PaneTypeEnum } from "@/config/panes/enums/pane-type.enum";
import { PanePropsConfig } from "@/config/panes/pane-props.config";
import { BasePaneProps } from "@/config/panes/types/pane-props.types";
import { Id } from "@/types/domain/id.types";

import { Event as EventEnum } from "../types/event.enum";

export class PaneOpenEvent<TPaneType extends PaneTypeEnum> extends Event {

    private _pane;

    private _parentId;

    private _props;

    public constructor(
        pane: TPaneType,
        props: Omit<PanePropsConfig[TPaneType], keyof BasePaneProps>,
        parentId: Id | null
    ) {
        super(
            EventEnum.PANE_OPEN,
            {
                bubbles: true,
                cancelable: true
            }
        );

        this._pane = pane;
        this._props = props;
        this._parentId = parentId;
    }

    public get pane() {
        return this._pane;
    }

    public get parentId() {
        return this._parentId;
    }

    public get props() {
        return this._props;
    }

}
