import type { Metadata } from "next";

import {
    generatePageMetadata,
    NotFoundPage
} from "@payloadcms/next/views";

import { Turbo } from "@/turbo";

import { importMap } from "../importMap";

type Args = {
    params: Promise<{
        segments: string[];
    }>;
    searchParams: Promise<{
        [key: string]: string | string[];
    }>;
};

export const generateMetadata = async ({ params, searchParams }: Args): Promise<Metadata> =>
    generatePageMetadata({
        config: Turbo.getSanitizedPayloadConfig(),
        params: params,
        searchParams: searchParams
    });

const NotFound = ({ params, searchParams }: Args) => NotFoundPage({
    importMap: importMap,
    config: Turbo.getSanitizedPayloadConfig(),
    params: params,
    searchParams: searchParams
});

export default NotFound;
