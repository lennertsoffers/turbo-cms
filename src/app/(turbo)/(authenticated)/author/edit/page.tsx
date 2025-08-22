"use server";

import { notFound } from "next/navigation";

import { TurboContext } from "@turbo-cms/api/turbo-context";
import { ComponentMapConfig } from "@turbo-cms/core/config/components/component-map.config";
import * as CookieService from "@turbo-cms/services/server/network/cookie.service";
import * as PageService from "@turbo-cms/services/server/page/page.service";
import { Cookie } from "@turbo-cms/types-models/network/cookie.enum";
import { asyncMap } from "@turbo-cms/utils-fp/maybe-callback";
import { extracting } from "@turbo-cms/utils-general/array";
import { parseJson } from "@turbo-cms/utils-general/object";
import { orFindById } from "@turbo-cms/utils-payload/collection";

import { Editor } from "./_components/editor/editor.container";
import { AuthorContextProvider } from "./_context/author.context";
import { createComponentModel } from "./_helpers/component.helpers";
import { DEFAULT_PANEL_LAYOUT } from "./config";

import styles from "./page.module.scss";

type AuthorEditPageProps = {
    searchParams: Promise<{
        "page-id": string;
    }>;
};

const AuthorEditPage = async ({ searchParams }: AuthorEditPageProps) => {
    const page = await searchParams
        .then(extracting("page-id"))
        .then(PageService.getPageById);

    if(page.isNone()) return notFound();

    const rootComponent = await page
        .mapNullable(extracting("component"))
        .asyncChain(orFindById(TurboContext.getPayload())("components"))
        .then(asyncMap(createComponentModel));

    if(rootComponent.isNone()) return notFound();

    const panelLayout = (await CookieService.getCookie(Cookie.PANELS_LAYOUT_AUTHOR))
        .mapNullable(extracting("value"))
        .mapNullable(parseJson<number[]>)
        .unwrapOr(DEFAULT_PANEL_LAYOUT);

    return (
        <main className={styles["page"]}>
            <AuthorContextProvider
                componentMapConfig={ComponentMapConfig}
            >
                <Editor
                    page={page.unwrap()}
                    panelLayout={panelLayout}
                    rootComponent={rootComponent.unwrap()}
                />
            </AuthorContextProvider>
        </main>
    );
};

export default AuthorEditPage;
