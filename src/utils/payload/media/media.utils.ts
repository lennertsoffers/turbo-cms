import {
    just,
    Maybe,
    none
} from "@sweet-monads/maybe";

import { Media } from "@/config/payload/payload.types";

type ToMedia = (media: Media | string) => Maybe<Media>;

export const toMedia: ToMedia = (media) => (typeof media === "string"
    ? none()
    : just(media));

type GetUrl =
    (size: keyof Extract<Media["sizes"], object>) =>
    (media: Media) => string;

export const getUrl: GetUrl =
    (size) =>
    (media) => media.sizes?.[size]?.url ?? media.url;
