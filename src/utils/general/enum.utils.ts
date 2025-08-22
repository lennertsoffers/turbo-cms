export const valueOf = <TEnum extends string>(
    value: string,
    enumm: Record<TEnum, TEnum>
): TEnum | undefined => enumm[value as TEnum];
