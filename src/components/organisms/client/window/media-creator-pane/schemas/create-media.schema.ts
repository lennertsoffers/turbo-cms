import { z } from "zod";

export const CreateMediaSchema = z.object({
    name: z
        .string()
        .min(3),
    alt: z
        .string()
        .min(3),
    file: z.custom<File>()
});

export type CreateMediaModel = z.infer<typeof CreateMediaSchema>;
