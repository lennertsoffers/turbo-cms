import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const importEnv = (variable: keyof NodeJS.ProcessEnv) => {
    const envVariable = process.env[variable];
    if(envVariable === undefined) return;

    const asNumber = +envVariable;
    if(!isNaN(asNumber)) return asNumber;

    const asBoolean = envVariable === "true"
        ? true
        : envVariable === "false"
            ? false
            : undefined;
    if(asBoolean !== undefined) return asBoolean;

    try {
        return envVariable.startsWith("[") && envVariable.endsWith("]")
            ? JSON.parse(`${envVariable}`)
            : JSON.parse(`"${envVariable}"`);
    } catch (_error) {
        return undefined;
    }
};

export const env = createEnv({
    server: {
        PAYLOAD__DATABASE__URL: z.string()
            .url(),
        PAYLOAD__SECRET: z.string(),
        PAYLOAD__MEDIA__MAX_FILE_SIZE: z.number(),
        FEATURE_TOGGLES__PAYLOAD__PLUGINS: z.array(z.string()),
        APP__NAME: z.string(),
        APP__BASE_URL: z.string()
            .url()
    },
    client: {
        NEXT_PUBLIC__APP__BASE_URL: z.string()
            .url()
    },
    runtimeEnv: {
        PAYLOAD__DATABASE__URL: importEnv("PAYLOAD__DATABASE__URL"),
        PAYLOAD__SECRET: importEnv("PAYLOAD__SECRET"),
        PAYLOAD__MEDIA__MAX_FILE_SIZE: importEnv("PAYLOAD__MEDIA__MAX_FILE_SIZE"),
        FEATURE_TOGGLES__PAYLOAD__PLUGINS: importEnv("FEATURE_TOGGLES__PAYLOAD__PLUGINS"),
        APP__NAME: importEnv("APP__NAME"),
        APP__BASE_URL: importEnv("APP__BASE_URL"),
        NEXT_PUBLIC__APP__BASE_URL: process.env["NEXT_PUBLIC__APP__BASE_URL"]
    }
});

export type Env = typeof env;
