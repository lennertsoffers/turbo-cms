import { mongooseAdapter } from "@payloadcms/db-mongodb";
import "@payloadcms/next/css";
import { ReactNode } from "react";

import { env } from "@/config/env/env.config";
import { Turbo } from "@/turbo";

type Args = { children: ReactNode; };

const Layout = async ({ children }: Args) => {
    await Turbo
        .init({
            db: mongooseAdapter({
                url: env.PAYLOAD__DATABASE__URL
            }),

            secret: env.PAYLOAD__SECRET
        });

    return children;
};

export default Layout;
