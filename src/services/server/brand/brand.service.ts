import { Maybe } from "@sweet-monads/maybe";

import {
    BrandDetail,
    Media
} from "@/config/payload/payload.types";
import { extracting } from "@/utils/general/array.utils";
import { toMedia } from "@/utils/payload/media/media.utils";

import * as GlobalService from "../global/global.service";

type GetBrandDetail = () => Promise<Maybe<BrandDetail>>;
export const getBrandDetail: GetBrandDetail = async () => GlobalService.getGlobal("brand-detail");

type GetLogoIcon = () => Promise<Maybe<Media>>;
export const getLogoIcon: GetLogoIcon = async () =>
    GlobalService.getGlobal("logos")
        .then((logosGlobal) => logosGlobal
            .mapNullable(extracting("logoIcon"))
            .chain(toMedia));
