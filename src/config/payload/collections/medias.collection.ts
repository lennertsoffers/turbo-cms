import { CollectionConfig } from "payload";

export const Medias: CollectionConfig = {
    slug: "medias",
    labels: {
        plural: "medias",
        singular: "media"
    },
    fields: [
        {
            name: "name",
            type: "text"
        },
        {
            name: "alt",
            type: "text"
        }
    ],
    upload: {
        staticDir: "media",
        imageSizes: [
            {
                name: "icon",
                width: 128,
                height: 128,
                position: "centre",
                withoutEnlargement: false,
                withoutReduction: false
            },
            {
                name: "thumbnail",
                width: 400,
                height: 300,
                position: "centre",
                withoutEnlargement: false,
                withoutReduction: false
            },
            {
                name: "card",
                width: 768,
                height: 1024,
                position: "centre",
                withoutEnlargement: false,
                withoutReduction: false
            },
            {
                name: "tablet",
                width: 1024,
                height: undefined,
                position: "centre",
                withoutEnlargement: false,
                withoutReduction: false
            }
        ],
        adminThumbnail: "thumbnail",
        mimeTypes: [ "image/*" ]
    },
    access: {
        read: () => true
    }
};
