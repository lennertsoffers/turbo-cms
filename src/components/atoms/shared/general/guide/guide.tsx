import styles from "./guide.module.scss";

type GuideProps = {
    depth: number;
    guideOffset: number;
    initialOffset: number;
};

export const Guide = ({
    depth,
    guideOffset,
    initialOffset
}: GuideProps) => (
    <>
        {
            Array.from(
                {
                    length: depth
                },
                (_, index) => (
                    <div
                        style={{
                            left: `${(guideOffset * index) + initialOffset}px`
                        }}
                        className={styles["guide"]}
                        key={index}
                        role={"presentation"}
                    />
                )
            )
        }
    </>
);
