"use server";

import Image from "next/image";

import { env } from "@/config/env/env.config";
import * as BrandService from "@/services/server/brand/brand.service";
import { SIZE_ICON_L } from "@/utils/css/image/image.constants";
import { destruct } from "@/utils/fp/maybe/maybe.utils";
import { extracting } from "@/utils/general/array.utils";

import styles from "./head.module.scss";

type HeadProps = {};

export const Head = async ({}: HeadProps) => {
    const brandDetail = await BrandService.getBrandDetail();
    const logoIcon = await BrandService.getLogoIcon();

    const brandName = brandDetail.mapNullable(extracting("name"))
        .unwrapOr(env.APP__NAME);

    const media = destruct(logoIcon);
    const href = media.sizes?.icon?.url ?? media.url;

    return (
        <section className={styles["head"]}>
            {!!href && !!media.alt && (
                <Image
                    alt={media.alt}
                    className={styles["head__logo"]}
                    height={SIZE_ICON_L}
                    src={href}
                    width={SIZE_ICON_L}
                />
            )}
            <span className={styles["head__brand-name"]}>
                {brandName}
            </span>
        </section>
    );
};
