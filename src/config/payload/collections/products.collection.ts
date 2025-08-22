import { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
    slug: "products",
    labels: {
        plural: "products",
        singular: "product"
    },
    admin: {
        useAsTitle: "name"
    },
    fields: [
        {
            name: "name",
            label: "Name",
            type: "text",
            required: true,
            unique: true
        },
        {
            name: "thumbnail",
            label: "Thumbnail",
            type: "upload",
            required: true,
            relationTo: "medias"
        }
    ],
    access: {
        admin: () => true,
        read: () => true,
        delete: () => true
    }
};
