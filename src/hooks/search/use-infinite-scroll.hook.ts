import {
    useEffect,
    useRef
} from "react";

import { isDefined } from "@/utils/general/object.utils";

type UseInfiniteScrollProps = {
    isFetching: boolean;
    hasNextPage: boolean;
    fetchNextPage: () => void;
    element: HTMLElement | undefined;
};

export const useInfiniteScroll = ({
    isFetching,
    hasNextPage,
    fetchNextPage,
    element
}: UseInfiniteScrollProps) => {
    const pagesToFetchRef = useRef<number>(0);

    const observer = useRef<IntersectionObserver | undefined>(undefined);

    useEffect(
        () => {
            if(isFetching) return;
            if(pagesToFetchRef.current === 0) return;

            pagesToFetchRef.current--;
            fetchNextPage();
        },
        [
            isFetching,
            fetchNextPage
        ]
    );

    useEffect(
        () => {
            observer.current?.disconnect();

            if(isDefined(element)) {
                const scheduleFetchNextPage = () => {
                    if(!hasNextPage) return;

                    if(!isFetching) {
                        fetchNextPage();
                    } else {
                        pagesToFetchRef.current++;
                    }
                };

                const onElementInView: IntersectionObserverCallback = (entries) => {
                    const observedElement = entries.at(0);
                    if(!observedElement?.isIntersecting) return;

                    scheduleFetchNextPage();
                };

                observer.current = new IntersectionObserver(onElementInView);
                observer.current.observe(element);
            }

            return () => {
                observer.current?.disconnect();
            };
        },
        [
            element,
            hasNextPage,
            isFetching,
            fetchNextPage
        ]
    );
};
