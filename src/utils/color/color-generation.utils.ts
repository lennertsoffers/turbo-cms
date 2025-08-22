import * as crypto from "crypto";

export const generateIdentityHsl = (input: string) => {
    const hash = crypto
        .createHash("md5")
        .update(input)
        .digest("hex");

    const hue = parseInt(
        hash.substring(
            0,
            2
        ),
        16
    ) % 360;
    const saturation = 40 + (parseInt(
        hash.substring(
            2,
            4
        ),
        16
    ) % 21);
    const lightness = 40 + (parseInt(
        hash.substring(
            4,
            6
        ),
        16
    ) % 21);

    return {
        hue: hue,
        saturation: saturation,
        lightness: lightness
    };
};
