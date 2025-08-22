"use client";

type ColorPreviewProps = {
    color: string;
    className?: string;
};

export const ColorPreview = ({
    color,
    className
}: ColorPreviewProps) => {
    return (
        <div
            style={{
                backgroundColor: color
            }}
            className={className}
        />
    );
};
