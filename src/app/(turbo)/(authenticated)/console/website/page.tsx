"use server";

import { Header } from "@/components/atoms/server/brand/header/header";
import { PagesTree } from "@/components/organisms/client/data-view/pages-tree/pages-tree";
import * as PageService from "@/services/server/page/page.service";
import { FullPage } from "@/types/components/dnd/page.types";

type WebsitedPageProps = {};

const WebsitedPage = async ({}: WebsitedPageProps) => {
    const pages = await PageService.getRootPages() as FullPage[];

    // TODO - TK
    return (
        <>
            <Header title={"Website"} />
            <PagesTree pages={pages} />
        </>
    );
};

export default WebsitedPage;
