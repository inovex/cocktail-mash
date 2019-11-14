import { RGBColor } from './Color';
import { COLOR_DISTANCE_MAX, colorDistance, colorDistanceNormalized } from './colorDistance';

describe('utils#colorDistance', () => {
    it('should calculate max distance for black and white', () => {
        const white: RGBColor = {
            blue: 255,
            green: 255,
            red: 255,
        };

        const black: RGBColor = {
            blue: 0,
            green: 0,
            red: 0,
        };

        expect(colorDistance(black, white)).toBe(COLOR_DISTANCE_MAX);
        expect(colorDistanceNormalized(black, white)).toBe(1);
    });

    it('should have a 5% distance', () => {
        const color1: RGBColor = {
            blue: 200,
            green: 200,
            red: 200,
        };

        const color2: RGBColor = {
            blue: 181,
            green: 210,
            red: 195,
        };

        expect(colorDistanceNormalized(color1, color2)).toBeCloseTo(0.147,3)
    });
});
