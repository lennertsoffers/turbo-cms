import {
    Either,
    left,
    right
} from "@sweet-monads/either";

declare const __brandEitherLeft: unique symbol;
declare const __brandEitherRight: unique symbol;
type EitherBrand<BLeft, BRight> = {
    [__brandEitherLeft]?: BLeft;
    [__brandEitherRight]?: BRight;
};

const EitherType = {
    LEFT: "Left",
    RIGHT: "Right"
} as const;

type ParsedSerializedEither<TLeft, TRight> = {
    type: typeof EitherType.LEFT;
    value: TLeft;
} | {
    type: typeof EitherType.RIGHT;
    value: TRight;
};

export type SerializedEither<TLeft, TRight> = EitherBrand<TLeft, TRight> & string;

type Serialize = <TLeft, TRight>(either: Either<TLeft, TRight>) => SerializedEither<TLeft, TRight>;
export const serialize: Serialize = <TLeft, TRight>(
    either: Either<TLeft, TRight>
) => JSON.stringify(either) as SerializedEither<TLeft, TRight>;

type Deserialize = <TLeft, TRight>(
    either: SerializedEither<TLeft, TRight>
) => Either<TLeft, TRight>;
export const deserialize: Deserialize = <TLeft, TRight>(
    either: SerializedEither<TLeft, TRight>
) => {
    const parsedEither: ParsedSerializedEither<TLeft, TRight> = JSON.parse(either);

    return parsedEither.type === EitherType.LEFT
        ? left(parsedEither.value)
        : right(parsedEither.value);
};
