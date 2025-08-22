import { Media } from "@/config/payload/payload.types";

import { Event as EventEnum } from "../types/event.enum";

export class MediaCreatedEvent extends Event {

    private _media;

    public constructor(media: Media) {
        super(
            EventEnum.MEDIA_CREATED,
            {
                bubbles: true,
                cancelable: true
            }
        );

        this._media = media;
    }

    public get media() {
        return this._media;
    }

}
