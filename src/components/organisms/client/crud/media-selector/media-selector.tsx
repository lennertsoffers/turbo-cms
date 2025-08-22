"use client";

import { useTranslation } from "@payloadcms/ui";
import {
    useInfiniteQuery,
    useQueryClient
} from "@tanstack/react-query";
import { PlusSignSquareIcon } from "hugeicons-react";
import {
    Dispatch,
    SetStateAction,
    useRef,
    useState
} from "react";

import { MediaCardElementType } from "@/components/atoms/shared/crud/media-card/enums/media-card-element-type.enum";
import { MediaCard } from "@/components/atoms/shared/crud/media-card/media-card";
import { Button } from "@/components/atoms/shared/general/button/button";
import { ButtonVariant } from "@/components/atoms/shared/general/button/enums/button-variant.enum";
import { FormField } from "@/components/molecules/client/form/form-field/form-field";
import { BaseTranslations } from "@/config/i18n/translations.config";
import { TranslationKey } from "@/config/i18n/types/translation-keys.types";
import { PaneType as PaneEnum } from "@/config/panes/enums/pane-type.enum";
import { Media } from "@/config/payload/payload.types";
import { QueryKey } from "@/config/query/query-key.config";
import { useInfiniteScroll } from "@/hooks/search/use-infinite-scroll.hook";
import { useEventService } from "@/hooks/service/use-event-service.hook";
import { usePane } from "@/hooks/window/use-pane-OLD.hook";
import { Event } from "@/services/client/event/types/event.enum";
import { isEmpty } from "@/utils/general/array.utils";
import { isDefined } from "@/utils/general/object.utils";

import {
    QUERY_STALE_TIME,
    THROTTLE
} from "./config/find-by-name.config";
import { MediaSelectorSkeleton } from "./media-selector.skeleton";
import { findByName } from "./query/find-by-name.query";

import styles from "./media-selector.module.scss";

type MediaSelectorProps = {
    media: Media | undefined;
    setMedia: Dispatch<SetStateAction<Media | undefined>>;
};

export const MediaSelector = ({
    media,
    setMedia
}: MediaSelectorProps) => {
    const { t } = useTranslation<BaseTranslations, TranslationKey>();

    const inputRef = useRef<HTMLInputElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout>(undefined);
    const pendingQueryRef = useRef<string>("");

    const [
        query,
        setQuery
    ] = useState<string>("");

    const [
        fetchNextElement,
        setFetchNextElement
    ] = useState<HTMLElement | undefined>(undefined);

    const queryClient = useQueryClient();

    const { closePane, openPane } = usePane();

    const {
        isLoading,
        isFetching,
        isFetchingNextPage,
        data,
        hasNextPage,
        fetchNextPage
    } = useInfiniteQuery({
        queryKey: [
            QueryKey.MEDIA_SELECTOR_MEDIAS,
            query
        ],
        queryFn: findByName(query ?? ""),
        placeholderData: (prev) => prev,
        staleTime: QUERY_STALE_TIME,
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage.nextPage
    });

    useEventService({
        [Event.MEDIA_CREATED]: (event) => {
            queryClient.invalidateQueries({
                queryKey: [ QueryKey.MEDIA_SELECTOR_MEDIAS ],
                exact: false
            });

            if(inputRef.current?.value) {
                inputRef.current.value = "";
            }

            setQuery("");
            setMedia(event.media);

            closePane(PaneEnum.MEDIA_CREATOR);
        }
    });

    useInfiniteScroll({
        element: fetchNextElement,
        isFetching: isFetching,
        hasNextPage: hasNextPage,
        fetchNextPage: fetchNextPage
    });

    const pages = data?.pages;

    const medias = pages?.flatMap(({ docs }) => docs ?? []) ?? [];
    const hasResults = !isEmpty(medias);
    const firstMediaOfLastPageId = pages?.at(-1)?.docs.at(0)?.id;

    const isActive = ({ id }: Media) => id === media?.id;

    const handleOnCreateNewClick = () => openPane(PaneEnum.MEDIA_CREATOR);

    const handleOnChange = () => {
        if(!isDefined(timeoutRef.current)) {
            if(isDefined(inputRef.current?.value)) {
                setQuery(inputRef.current.value);
            }

            timeoutRef.current = setTimeout(
                () => {
                    setQuery(pendingQueryRef.current);
                    timeoutRef.current = undefined;
                },
                THROTTLE
            );
        }

        if(isDefined(inputRef.current?.value)) {
            pendingQueryRef.current = inputRef.current.value;
        }
    };

    const createMediaElementRef =
        (media: Media) =>
        (element: HTMLElement | null) => {
            if(!isDefined(element)) return;
            if(firstMediaOfLastPageId !== media.id) return;

            setFetchNextElement(element);
        };

    const createHandleOnSelect =
            (media: Media) =>
            () => setMedia(media);

    return (
        <>
            <fieldset className={styles["media-selector__fieldset"]}>
                <FormField
                    className={styles["media-selector__input"]}
                    placeholder={t("custom:window:pane:media_selector:body:search_bar:placeholder")}
                    ref={inputRef}
                    type={"text"}
                    onChange={handleOnChange}
                />
                <Button
                    Icon={PlusSignSquareIcon}
                    color={"primary"}
                    title={t("custom:window:pane:media_selector:body:button:create_new")}
                    type={"button"}
                    variant={ButtonVariant.OUTLINE}
                    onClick={handleOnCreateNewClick}
                >
                    {t("custom:window:pane:media_selector:body:button:create_new")}
                </Button>
            </fieldset>
            {!isLoading && !isFetching && !hasResults && (
                <p>
                    {t(
                        "custom:window:pane:media_selector:body:search_results:no_results",
                        {
                            query: query
                        }
                    )}
                </p>
            )}
            {!isLoading && !!hasResults && (
                <ul className={styles["media-selector__medias"]}>
                    {medias.map((media) => (
                        <MediaCard
                            active={isActive(media)}
                            elementType={MediaCardElementType.LI}
                            key={media.id}
                            media={media}
                            ref={createMediaElementRef(media)}
                            onClick={createHandleOnSelect(media)}
                        />
                    ))}
                </ul>
            )}
            {(!!isLoading || !!isFetchingNextPage) && <MediaSelectorSkeleton />}
        </>
    );
};
