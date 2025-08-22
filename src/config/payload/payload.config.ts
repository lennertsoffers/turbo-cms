import path from "path";
import { fileURLToPath } from "url";

import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { Config } from "payload";
import sharp from "sharp";

import { env } from "../env/env.config";
import { BaseI18nConfig } from "../i18n/translations.config";
import { Components } from "../payload/collections/components.collection";
import { Medias } from "../payload/collections/medias.collection";
import { PageSocialMediaSharing } from "../payload/collections/page-social-media-sharing.collection";
import { Pages } from "../payload/collections/pages.collection";
import { Preferences } from "../payload/collections/preferences.collection";
import { Products } from "../payload/collections/products.collection";
import { Users } from "../payload/collections/users.collection";
import { Brand } from "../payload/globals/brand.global";
import { Logos } from "../payload/globals/logos.global";

import { Variables } from "./collections/variables.collection";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export const BasePayloadConfig: Config = {
    serverURL: "http://localhost:3000",
    db: mongooseAdapter({
        url: env.PAYLOAD__DATABASE__URL
    }),
    secret: env.PAYLOAD__SECRET,
    csrf: [],
    i18n: BaseI18nConfig,
    admin: {
        user: Users.slug
    },
    collections: [
        Products,
        Pages,
        Medias,
        Preferences,
        Users,
        Components,
        PageSocialMediaSharing,
        Variables
    ],
    globals: [
        Brand,
        Logos
    ],
    upload: {
        limits: {
            fileSize: env.PAYLOAD__MEDIA__MAX_FILE_SIZE
        }
    },
    editor: lexicalEditor(),
    typescript: {
        outputFile: path.resolve(
            dirname,
            "payload.types.ts"
        )
    },
    graphQL: {
        disablePlaygroundInProduction: true
    },
    sharp: sharp
};

export default BasePayloadConfig;
