import { RGBColor } from './Color';

export const COLOR_DISTANCE_MAX = Math.sqrt(195075);
export const COLOR_DISTANCE_ZERO = 150;

// calculate euclidean color distance
export const colorDistance = (color1: RGBColor, color2: RGBColor): number => {
    return Math.sqrt(
        Math.pow(color1.red - color2.red, 2)
        + Math.pow(color1.green - color2.green, 2)
        + Math.pow(color1.blue - color2.blue, 2)
    );
}

export const colorDistanceNormalized = (color1: RGBColor, color2: RGBColor): number => {
    const distance = colorDistance(color1, color2);

    if (distance > COLOR_DISTANCE_ZERO) {
        return 1;
    } else {
        return distance/COLOR_DISTANCE_ZERO;
    }

    // return colorDistance(color1, color2)/COLOR_DISTANCE_MAX;
}
