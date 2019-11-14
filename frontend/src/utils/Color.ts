export interface RGBColor {
    red: number;
    green: number;
    blue: number;
}

export const toColorString = (color: RGBColor) => {
    return `rgba(${color.red},${color.green},${color.blue},1)`;
}
