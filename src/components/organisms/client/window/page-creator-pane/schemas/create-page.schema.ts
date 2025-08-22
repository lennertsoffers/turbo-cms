import { z } from "zod";

export const CreatePageSchema = z.object({
    path: z.string()
        .min(3),
    type: z.enum([
        "PAGE",
        "FOLDER"
    ]),
    title: z.string()
        .min(3),
    description: z.string(),
    favicon: z.string()
        .min(1)
});

export type CreatePageModel = z.infer<typeof CreatePageSchema>;
