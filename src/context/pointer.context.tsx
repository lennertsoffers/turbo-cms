"use client";

import {
    createContext,
    PropsWithChildren,
    useContext,
    useRef
} from "react";

import { Coordinates } from "@/types/domain/geometry/coordinates.types";
import { isDefined } from "@/utils/general/object.utils";
import { useDocumentEventHandlers } from "@/utils/react/hooks/document-event-handlers.hook";

export type PointerContextValue = {
    getCoordinates: () => Coordinates | undefined;
};

const PointerContext = createContext<PointerContextValue | undefined>(
    undefined
);

export const PointerContextProvider = ({ children }: PropsWithChildren) => {
    const value = useRef<Coordinates | undefined>(undefined);

    const getCoordinates = () => value.current;

    const updatePointerCoordinates = ({ clientX, clientY }: PointerEvent) =>
        value.current = {
            x: clientX,
            y: clientY
        };

    useDocumentEventHandlers({
        pointermove: updatePointerCoordinates
    });

    return (
        <PointerContext.Provider value={{
            getCoordinates: getCoordinates
        }}
        >
            {children}
        </PointerContext.Provider>
    );
};

export const usePointerContext = () => {
    const context = useContext(PointerContext);

    if(!isDefined(context)) {
        throw new Error(
            "usePointerContext can only be used inside a PointerContext"
        );
    }

    return context;
};
