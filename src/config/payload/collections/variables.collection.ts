import { CollectionConfig } from "payload";

export const Variables: CollectionConfig = {
    slug: "variables",
    fields: [
        {
            name: "name",
            type: "text",
            required: true,
            unique: true
        },
        {
            name: "text-value",
            type: "text"
        },
        {
            name: "number-value",
            type: "number"
        },
        {
            name: "color-value",
            type: "text"
        },
        {
            name: "type",
            type: "select",
            options: [
                {
                    label: "color",
                    value: "COLOR"
                },
                {
                    label: "text",
                    value: "TEXT"
                },
                {
                    label: "number",
                    value: "NUMBER"
                }
            ],
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
