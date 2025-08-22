export type Props<
    TComponent extends (props: object) => JSX.Element
> = Parameters<TComponent>[0];
