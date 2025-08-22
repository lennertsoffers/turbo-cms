import { z } from "zod";

export const LoginSchema = z.object({
    email: z
        .string()
        .min(3),
    password: z
        .string()
        .min(3)
});

export type LoginModel = z.infer<typeof LoginSchema>;
