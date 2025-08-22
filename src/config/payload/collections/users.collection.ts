import type { CollectionConfig } from "payload";

import { Role } from "../authorisation/role.enum";

export const Users: CollectionConfig = {
    slug: "users",
    labels: {
        plural: {
            en: "users",
            nl: "gebruikers"
        },
        singular: {
            en: "user",
            nl: "gebruiker"
        }
    },
    admin: {
        useAsTitle: "email"
    },
    auth: {
        depth: 0,

        // TODO - No infinite lockTime
        lockTime: 1000 * 60 * 10000,
        maxLoginAttempts: 5,
        tokenExpiration: 60 * 60
    },
    fields: [
        {
            name: "firstName",
            label: {
                en: "first name",
                nl: "voornaam"
            },
            type: "text",
            required: true
        },
        {
            name: "lastName",
            label: {
                en: "last name",
                nl: "achternaam"
            },
            type: "text",
            required: true
        },
        {
            name: "role",
            label: {
                en: "role",
                nl: "rol"
            },
            type: "radio",
            options: [
                {
                    value: Role.MASTER,
                    label: {
                        en: "master",
                        nl: "master"
                    }
                },
                {
                    value: Role.OWNER,
                    label: {
                        en: "owner",
                        nl: "eigenaar"
                    }
                },
                {
                    value: Role.ADMIN,
                    label: {
                        en: "admin",
                        nl: "administrator"
                    }
                },
                {
                    value: Role.AUTHOR,
                    label: {
                        en: "author",
                        nl: "auteur"
                    }
                },
                {
                    value: Role.VISITOR,
                    label: {
                        en: "visitor",
                        nl: "bezoeker"
                    }
                }
            ],
            required: true
        },
        {
            name: "profileImage",
            label: {
                en: "profile image",
                nl: "profiel foto"
            },
            type: "upload",
            relationTo: "medias"
        },
        {
            name: "preferences",
            label: {
                en: "preferences",
                nl: "voorkeuren"
            },
            type: "relationship",
            relationTo: "preferences"
        }
    ]
};
