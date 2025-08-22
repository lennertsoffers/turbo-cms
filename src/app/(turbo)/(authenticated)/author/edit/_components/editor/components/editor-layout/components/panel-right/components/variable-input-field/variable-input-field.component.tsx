"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Tooltip from "@radix-ui/react-tooltip";
import classNames from "classnames";
import {
    Settings03Icon,
    Unlink04Icon
} from "hugeicons-react";
import {
    ChangeEventHandler,
    ComponentProps,
    Dispatch,
    MouseEvent,
    RefObject,
    SetStateAction,
    useRef,
    useState
} from "react";

import { IconComponent } from "@turbo-cms/types-components/components/icon";
import {
    VariableType,
    VariableTypeEnum
} from "@turbo-cms/types-models/author/variable-type.enum";
import {
    Variable,
    VariableTypeToVariableMap
} from "@turbo-cms/types-models/author/variable.types";
import { Id } from "@turbo-cms/types-models/id.types";
import { Key } from "@turbo-cms/types-models/keyboard/key.enum";
import { isDefined } from "@turbo-cms/utils-general/object";
import { createKeyHandler } from "@turbo-cms/utils-react/event/keyboard-event.handler";
import { useDocumentEventHandlers } from "@turbo-cms/utils-react/hooks/document-event-handlers.hook";

import { ColorPreview } from "./components/color-preview.component";

import styles from "./variable-input-field.module.scss";

const COLOR_REGEX = new RegExp("^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\\((-?\\d+%?[,\\s]+){2,3}\\s*[\\d\\.]+%?\\))$");

type VariableInputFieldComponentProps<TVariableType extends VariableTypeEnum> = {
    label?: string;
    variableType: TVariableType;
    selectedVariable: Variable<TVariableType> | undefined;
    activeVariableId: Id | undefined;
    variables: Variable<TVariableType>[];
    queryInputRef: RefObject<HTMLInputElement | null>;
    className?: string;
    inputClassName?: string;
    tooltip?: string;
    setSelectedVariableId: (id: Id | undefined) => void;
    setActiveVariableId: Dispatch<SetStateAction<Id | undefined>>;
    onQueryInputChange: ChangeEventHandler;
    onChangeValue: <TOnChangeValue extends VariableTypeEnum = TVariableType>(value: {
        inputType: "value";
        values: Omit<VariableTypeToVariableMap[TOnChangeValue], "createdAt" | "id" | "name" | "updatedAt">;
    }) => void;
    Icon?: IconComponent;
} & Omit<ComponentProps<"input">, "type">;

export const VariableInputFieldComponent = <TVariableType extends VariableTypeEnum>({
    label,
    variableType,
    selectedVariable,
    activeVariableId,
    variables,
    queryInputRef,
    className,
    inputClassName,
    tooltip,
    setActiveVariableId,
    setSelectedVariableId,
    onQueryInputChange,
    onChangeValue,
    Icon,
    ...inputProps
}: VariableInputFieldComponentProps<TVariableType>) => {
    const textInputRef = useRef<HTMLInputElement>(null);
    const numberInputRef = useRef<HTMLInputElement>(null);
    const colorInputRef = useRef<HTMLInputElement>(null);

    const [
        open,
        setOpen
    ] = useState<boolean>(false);

    const [
        colorValue,
        setColorValue
    ] = useState<string | undefined>(undefined);

    const colorPreviewValue = (
        selectedVariable?.type === VariableType.COLOR
            ? selectedVariable["color-value"]
            : undefined
    ) ?? colorValue;

    useDocumentEventHandlers({
        click: (event) => {
            if(event.target !== document.documentElement) return;

            setOpen(false);
        }
    });

    const handleOnInputKeyDown = createKeyHandler([
        {
            keys: [ Key.ARROW_UP ],
            handler: (event) => {
                event.preventDefault();

                setActiveVariableId((previousSelectedVariableId) => {
                    const selectedIndex = variables.findIndex(
                        ({ id }) => previousSelectedVariableId === id
                    );

                    if(selectedIndex === -1) return variables.at(-1)?.id;
                    if(selectedIndex === 0) return undefined;

                    return variables.at(selectedIndex - 1)?.id;
                });
            }
        },
        {
            keys: [ Key.ARROW_DOWN ],
            handler: (event) => {
                event.preventDefault();

                setActiveVariableId((previousSelectedVariableId) => {
                    const selectedIndex = variables.findIndex(
                        ({ id }) => previousSelectedVariableId === id
                    );

                    if(selectedIndex === -1) return variables.at(0)?.id;
                    if(selectedIndex === variables.length - 1) return undefined;

                    return variables.at(selectedIndex + 1)?.id;
                });
            }
        },
        {
            keys: [ Key.ENTER ],
            handler: () => {
                if(!isDefined(activeVariableId)) return;

                setSelectedVariableId(activeVariableId);
                setOpen(false);
                setActiveVariableId(undefined);
            }
        },
        {
            keys: [ Key.ESCAPE ],
            handler: () => {
                setOpen(false);
                setActiveVariableId(undefined);
            }
        }
    ]);

    const handleOnLinkVariableClick = () => setOpen((currentOpen) => !currentOpen);

    const handleOnUnlinkVariableClick = () => setSelectedVariableId(undefined);

    const handleOnSelectedVariableClick = () => {
        setOpen(true);
    };

    const handleOnInputClick = (event: MouseEvent) => {
        if(!(event.target instanceof HTMLElement)) return;

        event.target.focus();
    };

    const handleOnQueryInputChange = onQueryInputChange;

    const handleOnFocus = () => queryInputRef.current?.focus();

    const createHandleOnVariableItemClick =
        (id: Id) =>
        () => {
            setSelectedVariableId(id);
            setOpen(false);
            setActiveVariableId(undefined);
        };

    const handleOnTextValueChange = () => {
        const inputValue = textInputRef.current?.value;
        if(!isDefined(inputValue)) return;

        onChangeValue<typeof VariableType.TEXT>({
            inputType: "value",
            values: {
                "type": VariableType.TEXT,
                "text-value": inputValue
            }
        });
    };

    const handleOnNumberValueChange = () => {
        if(!isDefined(numberInputRef.current?.value)) return;
        const inputValue = parseFloat(numberInputRef.current.value);

        if(isNaN(inputValue)) return;
        if(!isFinite(inputValue)) return;

        onChangeValue<typeof VariableType.NUMBER>({
            inputType: "value",
            values: {
                "type": VariableType.NUMBER,
                "number-value": inputValue
            }
        });
    };

    const handleOnColorValueChange = () => {
        const inputValue = colorInputRef.current?.value;
        if(!isDefined(inputValue)) return;
        if(!COLOR_REGEX.test(inputValue)) return;

        setColorValue(inputValue);

        onChangeValue<typeof VariableType.COLOR>({
            inputType: "value",
            values: {
                "type": VariableType.COLOR,
                "color-value": inputValue
            }
        });
    };

    return (
        <DropdownMenu.Root open={open}>
            <DropdownMenu.Trigger asChild={true}>
                <div className={styles["variable-input-field__wrapper"]}>
                    {label && (
                        <p className={styles["variable-input-field__label"]}>
                            {label}
                        </p>
                    )}
                    <span className={classNames(
                        styles["variable-input-field"],
                        className
                    )}
                    >
                        {isDefined(Icon) && tooltip && variableType !== VariableType.COLOR && (
                            <Tooltip.Provider>
                                <Tooltip.Root>
                                    <Tooltip.Trigger asChild={true}>
                                        <Icon className={styles["variable-input-field__icon"]} />
                                    </Tooltip.Trigger>
                                    <Tooltip.Portal>
                                        <Tooltip.Content
                                            className={styles["variable-input-field__tooltip"]}
                                            sideOffset={5}
                                        >
                                            {tooltip}
                                            <Tooltip.Arrow className={styles["variable-input-field__tooltip__arrow"]} />
                                        </Tooltip.Content>
                                    </Tooltip.Portal>
                                </Tooltip.Root>
                            </Tooltip.Provider>
                        )}
                        {isDefined(Icon) && !tooltip && variableType !== VariableType.COLOR && (
                            <Icon className={styles["variable-input-field__icon"]} />
                        )}
                        {variableType === VariableType.COLOR && (
                            <ColorPreview
                                className={styles["variable-input-field__color-preview"]}
                                color={colorPreviewValue ?? inputProps.defaultValue?.toString() ?? "#000"}
                            />
                        )}
                        {!isDefined(selectedVariable) && variableType === VariableType.TEXT && (
                            <input
                                {...inputProps}
                                className={classNames(
                                    styles["variable-input-field__input"],
                                    inputClassName
                                )}
                                ref={textInputRef}
                                type={"text"}
                                onChange={handleOnTextValueChange}
                                onClick={handleOnInputClick}
                            />
                        )}
                        {!isDefined(selectedVariable) && variableType === VariableType.NUMBER && (
                            <input
                                {...inputProps}
                                className={classNames(
                                    styles["variable-input-field__input"],
                                    inputClassName
                                )}
                                ref={numberInputRef}
                                type={"number"}
                                onChange={handleOnNumberValueChange}
                                onClick={handleOnInputClick}
                            />
                        )}
                        {!isDefined(selectedVariable) && variableType === VariableType.COLOR && (
                            <input
                                {...inputProps}
                                className={classNames(
                                    styles["variable-input-field__input"],
                                    inputClassName
                                )}
                                ref={colorInputRef}
                                type={"text"}
                                onChange={handleOnColorValueChange}
                                onClick={handleOnInputClick}

                            />
                        )}
                        {isDefined(selectedVariable) && (
                            <button
                                className={classNames(
                                    styles["variable-input-field__selected-variable"]
                                )}
                                onClick={handleOnSelectedVariableClick}
                            >
                                {selectedVariable.name}
                            </button>
                        )}
                        {!isDefined(selectedVariable) && (
                            <Tooltip.Provider>
                                <Tooltip.Root>
                                    <Tooltip.Trigger asChild={true}>
                                        <button
                                            className={styles["variable-input-field__button"]}
                                            onClick={handleOnLinkVariableClick}
                                        >
                                            <Settings03Icon />
                                        </button>
                                    </Tooltip.Trigger>
                                    <Tooltip.Portal>
                                        <Tooltip.Content
                                            className={styles["variable-input-field__tooltip"]}
                                            sideOffset={5}
                                        >
                                            {"link variable"}
                                            <Tooltip.Arrow className={styles["variable-input-field__tooltip__arrow"]} />
                                        </Tooltip.Content>
                                    </Tooltip.Portal>
                                </Tooltip.Root>
                            </Tooltip.Provider>
                        )}
                        {isDefined(selectedVariable) && (
                            <Tooltip.Provider>
                                <Tooltip.Root>
                                    <Tooltip.Trigger asChild={true}>

                                        <button
                                            className={styles["variable-input-field__button"]}
                                            onClick={handleOnUnlinkVariableClick}
                                        >
                                            <Unlink04Icon />
                                        </button>
                                    </Tooltip.Trigger>
                                    <Tooltip.Portal>
                                        <Tooltip.Content
                                            className={styles["variable-input-field__tooltip"]}
                                            sideOffset={5}
                                        >
                                            {"unlink variable"}
                                            <Tooltip.Arrow className={styles["variable-input-field__tooltip__arrow"]} />
                                        </Tooltip.Content>
                                    </Tooltip.Portal>
                                </Tooltip.Root>
                            </Tooltip.Provider>
                        )}
                    </span>
                </div>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    className={classNames(
                        styles["variable-input-field__dropdown"],
                        "variable-input-field__dropdown"
                    )}
                    onFocus={handleOnFocus}
                >
                    <input
                        autoFocus={true}
                        className={styles["variable-input-field__dropdown__input"]}
                        ref={queryInputRef}
                        type={"text"}
                        onChange={handleOnQueryInputChange}
                        onKeyDown={handleOnInputKeyDown}
                    />
                    {variables.map((variable) => (
                        <DropdownMenu.Item
                            className={classNames(
                                styles["variable-input-field__dropdown__item"],
                                activeVariableId === variable.id && styles["variable-input-field__dropdown__item--selected"]
                            )}
                            key={variable.id}
                            onClick={createHandleOnVariableItemClick(variable.id)}
                            onFocus={handleOnFocus}
                        >
                            {variable.name}
                        </DropdownMenu.Item>
                    ))}
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
};
