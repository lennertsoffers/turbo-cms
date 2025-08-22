import { Id } from "@/types/domain/id.types";

import { Event as EventEnum } from "../types/event.enum";

export class PaneCloseEvent extends Event {

    private _id;

    public constructor(id: Id) {
        super(
            EventEnum.PANE_CLOSE,
            {
                bubbles: true,
                cancelable: true
            }
        );

        this._id = id;
    }

    public get id() {
        return this._id;
    }

}
