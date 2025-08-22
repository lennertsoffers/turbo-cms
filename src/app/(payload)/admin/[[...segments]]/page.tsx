import type { Metadata } from "next";

import {
    generatePageMetadata,
    RootPage
} from "@payloadcms/next/views";

import { Turbo } from "@/turbo";

import { importMap } from "../importMap";

type Args = {
    params: {
        segments: string[];
    };
    searchParams: {
        [key: string]: string | string[];
    };
};

export const generateMetadata = ({ params, searchParams }: Args): Promise<Metadata> =>
    generatePageMetadata({
        config: Turbo.getSanitizedPayloadConfig(),
        params: new Promise((resolve) => resolve(params)),
        searchParams: new Promise((resolve) => resolve(searchParams))
    });

const Page = async ({ params, searchParams }: Args) => RootPage({
    importMap: importMap,
    config: Turbo.getSanitizedPayloadConfig(),
    params: new Promise((resolve) => resolve(params)),
    searchParams: new Promise((resolve) => resolve(searchParams))
});

export default Page;
