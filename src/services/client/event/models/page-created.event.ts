import { Page } from "@/config/payload/payload.types";

import { Event as EventEnum } from "../types/event.enum";

export class PageCreatedEvent extends Event {

    private _page;

    public constructor(page: Page) {
        super(
            EventEnum.PAGE_CREATED,
            {
                bubbles: true,
                cancelable: true
            }
        );

        this._page = page;
    }

    public get page() {
        return this._page;
    }

}
