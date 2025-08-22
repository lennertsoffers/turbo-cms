import { CollectionConfig } from "payload";

export const Pages: CollectionConfig = {
    slug: "pages",
    labels: {
        plural: "pages",
        singular: "page"
    },
    admin: {
        useAsTitle: "title"
    },
    fields: [
        {
            name: "root",
            label: "Root",
            type: "checkbox",
            defaultValue: false
        },
        {
            name: "path",
            label: "Path",
            type: "text",
            required: true,
            unique: true
        },
        {
            name: "type",
            label: "Type",
            type: "select",
            options: [
                {
                    label: "page",
                    value: "PAGE"
                },
                {
                    label: "folder",
                    value: "FOLDER"
                }
            ],
            defaultValue: "PAGE",
            enumName: "PageType",
            required: true
        },
        {
            name: "children",
            label: "Children",
            type: "relationship",
            relationTo: "pages",
            hasMany: true
        },
        {
            name: "component",
            label: "omponent",
            type: "relationship",
            relationTo: "components"
        },
        {
            name: "favicon",
            label: "favicon",
            type: "relationship",
            relationTo: "medias",
            required: false
        },
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
            required: false
        },
        {
            name: "page-social-media-sharing",
            label: "page social media sharing",
            type: "relationship",
            relationTo: "page-social-media-sharing",
            required: false
        }
    ],
    access: {
        read: () => true,
        create: () => true,
        update: () => true,
        delete: () => true
    }
};
