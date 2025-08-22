import { CollectionConfig } from "payload";

export const Components: CollectionConfig = {
    slug: "components",
    fields: [
        {
            name: "name",
            type: "text",
            required: true
        },
        {
            name: "props",
            type: "json",
            required: true,
            typescriptSchema: [
                () => ({
                    type: "object",
                    properties: {}
                })
            ]
        },
        {
            name: "children",
            type: "relationship",
            relationTo: "components",
            hasMany: true
        }
    ],
    access: {
        read: () => true,
        create: () => true,
        update: () => true,
        delete: () => true
    }
};
