"use client";

import Form from "next/form";
import {
    AnimationEventHandler,
    CSSProperties,
    FormEvent,
    ReactNode,
    useActionState,
    useState
} from "react";

import { Button } from "@/components/atoms/shared/general/button/button";
import { ButtonVariant } from "@/components/atoms/shared/general/button/enums/button-variant.enum";
import { SeparatorDirection } from "@/components/atoms/shared/general/separator/enums/separator-direction.enum";
import { Separator } from "@/components/atoms/shared/general/separator/separator";
import { PaneFooter } from "@/components/molecules/client/window/pane-footer/pane-footer";
import { PaneHeader } from "@/components/molecules/client/window/pane-header/pane-header";
import { IconComponent } from "@/types/domain/__TODO__/icon.component";

type FormPaneProps<TState> = {
    title: string | undefined;
    initialState: Awaited<TState>;
    SubmitButtonIcon: IconComponent;
    submitButtonText: string;
    cancelButtonText: string;
    headerButtons: ReactNode[];
    footerButtons: ReactNode[];
    id: string;
    wrapperClassName?: string;
    className?: string;
    style: CSSProperties;
    children: (props: {
        formState: TState;
        formPending: boolean;
    }) => ReactNode;
    onAnimationEnd: AnimationEventHandler;
    action: (state: Awaited<TState>, payload: FormData) => Promise<TState> | TState;
    close: () => void;
};

export const FormPane = <TState = never>({
    title,
    initialState,
    SubmitButtonIcon,
    cancelButtonText,
    submitButtonText,
    headerButtons,
    footerButtons,
    id,
    wrapperClassName,
    className,
    style,
    children,
    onAnimationEnd,
    action,
    close
}: FormPaneProps<TState>) => {
    const [
        formState,
        formAction,
        formPending
    ] = useActionState(
        action,
        initialState
    );

    const [
        formKey,
        setFormKey
    ] = useState(crypto.randomUUID());

    const handleOnReset = (event: FormEvent) => {
        event.stopPropagation();
        setFormKey(crypto.randomUUID());
    };

    const handleOnAnimationEnd = onAnimationEnd;

    const handleOnCancelButtonClick = close;

    const baseFooterButtons = [
        <Button
            color={"primary"}
            disabled={formPending}
            key={"cancel"}
            type={"reset"}
            variant={ButtonVariant.SOLID}
            onClick={handleOnCancelButtonClick}
        >
            {cancelButtonText}
        </Button>,
        <Button
            Icon={SubmitButtonIcon}
            color={"primary"}
            disabled={formPending}
            key={"save"}
            loading={false}
            title={submitButtonText}
            type={"submit"}
            variant={ButtonVariant.SOLID}
        >
            {submitButtonText}
        </Button>
    ];

    return (
        <Form
            action={formAction}
            className={wrapperClassName}
            id={id}
            key={formKey}
            style={style}
            onAnimationEnd={handleOnAnimationEnd}
            onReset={handleOnReset}
        >
            <PaneHeader
                close={close}
                headerButtons={headerButtons}
                title={title}
            />
            <Separator direction={SeparatorDirection.HORIZONTAL} />
            <section className={className}>
                {children({
                    formPending: formPending,
                    formState: formState
                })}
            </section>
            <Separator direction={SeparatorDirection.HORIZONTAL} />
            <PaneFooter footerButtons={[
                ...footerButtons,
                ...baseFooterButtons
            ]}
            />
        </Form>
    );
};
