import {
    AnimationEventHandler,
    CSSProperties,
    ReactNode
} from "react";

import { SeparatorDirection } from "@/components/atoms/shared/general/separator/enums/separator-direction.enum";
import { Separator } from "@/components/atoms/shared/general/separator/separator";
import { PaneFooter } from "@/components/molecules/client/window/pane-footer/pane-footer";
import { PaneHeader } from "@/components/molecules/client/window/pane-header/pane-header";

type AsidePaneProps = {
    title: string | undefined;
    headerButtons: ReactNode[];
    footerButtons: ReactNode[];
    id: string;
    wrapperClassName?: string;
    className?: string;
    style: CSSProperties;
    children?: ReactNode;
    onAnimationEnd: AnimationEventHandler;
    close: () => void;
};

export const AsidePane = ({
    title,
    headerButtons,
    footerButtons,
    id,
    wrapperClassName,
    className,
    style,
    children,
    onAnimationEnd,
    close
}: AsidePaneProps) => {
    const handleOnAnimationEnd = onAnimationEnd;

    return (
        <aside
            className={wrapperClassName}
            id={id}
            style={style}
            onAnimationEnd={handleOnAnimationEnd}
        >
            <PaneHeader
                close={close}
                headerButtons={headerButtons}
                title={title}
            />
            <Separator direction={SeparatorDirection.HORIZONTAL} />
            <section className={className}>
                {children}
            </section>
            <Separator direction={SeparatorDirection.HORIZONTAL} />
            <PaneFooter footerButtons={footerButtons} />
        </aside>
    );
};
