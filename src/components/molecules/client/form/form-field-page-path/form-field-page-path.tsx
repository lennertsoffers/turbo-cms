"use client";

import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";
import {
    ChangeEventHandler,
    KeyboardEventHandler,
    MouseEvent,
    useRef,
    useState
} from "react";

import { FormField } from "@/components/molecules/client/form/form-field/form-field";
import { Key } from "@/types/domain/keyboard/key.enum";
import { isNotEmpty } from "@/utils/general/array.utils";
import { isDefined } from "@/utils/general/object.utils";
import { createKeyHandler } from "@/utils/react/event/keyboard-event.handler";

import { FormFieldPagePathSkeleton } from "./form-field-page-path.skeleton";
import { getPagePathAutocomplete } from "./query/page-path-autocomplete.query";

import styles from "./form-field-page-path.module.scss";

type FormFieldPagePathProps = {
    label: string;
    name: string;
};

export const FormFieldPagePath = ({
    label,
    name
}: FormFieldPagePathProps) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const [
        open,
        setOpen
    ] = useState<boolean>(false);

    const [
        query,
        setQuery
    ] = useState<string | undefined>(undefined);

    const [
        selectedPathIndex,
        setSelectedPathIndex
    ] = useState<number | undefined>(undefined);

    const {
        isLoading,
        data
    } = useQuery({
        queryKey: [
            "pages-autocomplete",
            query
        ],
        queryFn: getPagePathAutocomplete(query ?? ""),
        placeholderData: (prev) => prev
    });

    const handleOnChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        setQuery(event.target.value);
        setSelectedPathIndex(undefined);
        setOpen(true);
    };

    const handleOnClick = (index: number) => {
        updateInputText(index);
        setSelectedPathIndex(index);
    };

    const handleOnKeyDown: KeyboardEventHandler = createKeyHandler([
        {
            keys: [ Key.ARROW_DOWN ],
            handler: (event) => {
                if(!isNotEmpty(data)) return;

                event.preventDefault();

                if(!isDefined(selectedPathIndex)) {
                    setSelectedPathIndex(0);
                    updateInputText(0);
                } else if(selectedPathIndex < data.length - 1) {
                    setSelectedPathIndex((currentIndex) => {
                        const index = (currentIndex ?? 0) + 1;

                        updateInputText(index);

                        return index;
                    });
                } else {
                    updateInputText(undefined);
                    setSelectedPathIndex(undefined);
                }
            }
        },
        {
            keys: [ Key.ARROW_UP ],
            handler: (event) => {
                if(!isNotEmpty(data)) return;

                event.preventDefault();

                if(!isDefined(selectedPathIndex)) {
                    const index = data.length - 1;

                    updateInputText(index);
                    setSelectedPathIndex(index);
                } else if(selectedPathIndex > 0) {
                    setSelectedPathIndex((currentIndex) => {
                        const index = (currentIndex ?? 0) - 1;

                        updateInputText(index);

                        return index;
                    });
                } else {
                    updateInputText(undefined);
                    setSelectedPathIndex(undefined);
                }
            }
        },
        {
            keys: [ Key.ESCAPE ],
            handler: () => {
                setOpen(false);
            }
        }
    ]);

    const handleOnFocus = () => setOpen(true);

    const handleOnBlur = () => setOpen(false);

    const updateInputText = (index: number | undefined) => {
        if(!isDefined(inputRef.current)) return;

        const newValue = isDefined(index)
            ? data?.at(index) ?? ""
            : query ?? "";

        inputRef.current.value = newValue;
        inputRef.current.setSelectionRange(
            newValue.length,
            newValue.length
        );
    };

    const createHandleOnClick =
    (index: number) =>
    (event: MouseEvent<HTMLLIElement>) => {
        event.preventDefault();
        handleOnClick(index);
    };

    const isActive = (index: number) => index === selectedPathIndex;

    const showSuggestions = open && (isLoading || (!isLoading && isNotEmpty(data)));

    return (
        <>
            <FormField
                autoComplete={"off"}
                label={label}
                name={name}
                ref={inputRef}
                onBlur={handleOnBlur}
                onChange={handleOnChange}
                onFocus={handleOnFocus}
                onKeyDown={handleOnKeyDown}
            />
            {!!showSuggestions && (
                <ul className={styles["form-field-page-path__autocomplete"]}>
                    {!isLoading && isNotEmpty(data) && data.map((path, index) => (
                        <li
                            className={classNames(
                                styles["form-field-page-path__suggestion"],
                                isActive(index) && styles["form-field-page-path__suggestion--active"]
                            )}
                            key={path}
                            onMouseDown={createHandleOnClick(index)}
                        >
                            {path}
                        </li>
                    ))}
                    {!!isLoading && <FormFieldPagePathSkeleton />}
                </ul>
            )}
        </>
    );
};
