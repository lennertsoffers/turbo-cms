import { Id } from "@/types/domain/id.types";

import { Event as EventEnum } from "../types/event.enum";

export class PaneOpenedEvent extends Event {

    private _id;

    public constructor(id: Id) {
        super(
            EventEnum.PANE_OPENED,
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
