import { CollectionConfig } from "payload";

export const PageSocialMediaSharing: CollectionConfig = {
    slug: "page-social-media-sharing",
    labels: {
        plural: "page social media sharing",
        singular: "page social media sharing"
    },
    admin: {},
    fields: [
        {
            name: "title",
            label: "title",
            type: "text",
            required: true
        },
        {
            name: "description",
            label: "description",
            type: "textarea",
            required: true
        }
    ],
    access: {
        read: () => true,
        create: () => true,
        update: () => true,
        delete: () => true
    }
};
