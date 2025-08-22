import { z } from "zod";

export const UpdatePageSchema = z.object({
    id: z.string()
        .min(3),
    path: z.string()
        .min(3),
    title: z.string()
        .min(3),
    description: z.string(),
    favicon: z.string()
        .min(1)
});

export type UpdatePageModel = z.infer<typeof UpdatePageSchema>;
