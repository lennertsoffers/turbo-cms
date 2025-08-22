import { GlobalConfig } from "payload";

export const Brand: GlobalConfig = {
    slug: "brand-detail",
    label: {
        en: "brand detail",
        nl: "merk gegeven"
    },
    fields: [
        {
            name: "name",
            label: {
                en: "name",
                nl: "naam"
            },
            type: "text",
            required: true
        }
    ]
};
