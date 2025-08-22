import { GlobalConfig } from "payload";

export const Logos: GlobalConfig = {
    slug: "logos",
    label: {
        en: "logos",
        nl: "logos"
    },
    fields: [
        {
            name: "logoIcon",
            label: {
                en: "logo icon",
                nl: "logo icoon"
            },
            type: "relationship",
            relationTo: "medias"
        },
        {
            name: "favicon-default",
            label: {
                en: "default favicon",
                nl: "standaard favicon"
            },
            type: "relationship",
            relationTo: "medias",
            required: true
        }
    ]
};
