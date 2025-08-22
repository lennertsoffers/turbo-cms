import {
    fromNullable,
    Maybe,
    none
} from "@sweet-monads/maybe";

import { Media } from "@/config/payload/payload.types";
import { Turbo } from "@/turbo";

type GetMediaById = (id: string) => Promise<Maybe<Media>>;
export const getMediaById: GetMediaById = async (id) => {
    const payload = await Turbo.getPayload();

    const media = await payload.findByID({
        collection: "medias",
        id: id
    });

    return fromNullable(media);
};

type GetMedia = (media: Maybe<Media | string>) => Promise<Maybe<Media>>;
export const getMedia: GetMedia = async (media) =>
        media.fold(
            () => none(),
            (m) => (typeof m !== "string"
                ? fromNullable(m)
                : getMediaById(m))
        );
