import { Event as EventEnum } from "../types/event.enum";

export class PaneCloseAllEvent extends Event {

    public constructor() {
        super(
            EventEnum.PANE_CLOSE_ALL,
            {
                bubbles: true,
                cancelable: true
            }
        );
    }

}
