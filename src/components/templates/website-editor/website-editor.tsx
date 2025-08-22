"use server";

import { Suspense } from "react";

import { Pages } from "./components/pages/pages";
import { PagesSkeleton } from "./components/pages/pages.skeleton";

type WebsiteEditorProps = {};

export const WebsiteEditor = async ({}: WebsiteEditorProps) => {
    return (
        <Suspense fallback={<PagesSkeleton />}>
            <Pages />
        </Suspense>
    );
};
