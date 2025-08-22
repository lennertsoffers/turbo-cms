import { Maybe } from "@sweet-monads/maybe";
import Image from "next/image";
import Link from "next/link";

import { Media } from "@/config/payload/payload.types";
import { SIZE_ICON_L } from "@/utils/css/image/image.constants";
import { extracting } from "@/utils/general/array.utils";
import { getUrl } from "@/utils/payload/media/media.utils";

import styles from "./account-link.module.scss";

type AccountLinkProps = {
    href: string;
    firstName: string;
    lastName: string;
    image: Maybe<Media>;
};

export const AccountLink = ({
    href,
    firstName,
    lastName,
    image
}: AccountLinkProps) => {
    const imageUrl = image
        .mapNullable(getUrl("icon"))
        .unwrapOr("https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg");

    const imageAlt = image
        .map(extracting("alt"))
        .unwrapOr("");

    return (
        <Link
            className={styles["account-link"]}
            href={href}
        >
            <Image
                alt={imageAlt}
                className={styles["account-link__image"]}
                height={SIZE_ICON_L}
                src={imageUrl}
                width={SIZE_ICON_L}
            />
            <span>
                {firstName}
                {" "}
                {lastName}
            </span>
        </Link>
    );
};
