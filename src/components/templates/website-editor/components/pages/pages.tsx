"use server";

import { PagesTree } from "@/components/organisms/client/data-view/pages-tree/pages-tree";
import * as PageService from "@/services/server/page/page.service";
import { FullPage } from "@/types/components/dnd/page.types";

type PagesProps = {};

export const Pages = async ({}: PagesProps) => {
    const pages = await PageService.getRootPages();

    // TODO - No type assertion
    return <PagesTree pages={pages as FullPage[]} />;
};
