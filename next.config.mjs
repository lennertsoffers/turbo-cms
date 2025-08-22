import { withPayload } from "@payloadcms/next/withPayload";
import createJiti from "jiti";
import path from "path";

const jiti = createJiti(
    new URL(import.meta.url).pathname,
    {
        alias: {
            "@/*": "./src/*"
        },
        experimentalBun: true,
        esmResolve: true
    }
);
jiti("./src/config/env/env.config.ts");

const applyPlugins = (plugins) => (nextConfig) => plugins.reduce(
    (config, plugin) => plugin(config),
    nextConfig
);

/** @type {import("next").NextConfig} */
const nextConfig = {
    experimental: {
        reactCompiler: true,
        serverActions: {
            bodySizeLimit: "10mb"
        }
    },
    sassOptions: {
        silenceDeprecations: [ "legacy-js-api" ]
    },
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
                port: "3000"
            }
        ]
    }
};

const plugins = [ withPayload ];

export default applyPlugins(plugins)(nextConfig);
