import { calculateFillColor } from "./calculateFillColor";
import { RGBColor } from './Color';

describe('utils#calculateFillColor', () => {
    describe('Level 1 Color', () => {
        it('should mix 10/30/60', () => {
            const result = calculateFillColor({
                cyan: 10,
                magenta: 30,
                yellow: 60
            });
            const expected: RGBColor = { red: 229, green: 179, blue: 102 };

            expect(result).toEqual(expected);
        });
    });

    describe('Level 2 Color', () => {
        it('should mix 9:5:3', () => {
            const result = calculateFillColor({
                cyan: 90,
                magenta: 50,
                yellow: 30
            });
            const expected: RGBColor = { red: 120, green: 180, blue: 210 };

            expect(result).toEqual(expected);
        });
    });

    describe('Level 3 Color', () => {
        it('should mix stuff', () => {
            const result = calculateFillColor({
                cyan: 45,
                magenta: 180,
                yellow: 90
            });
            const expected: RGBColor = { red: 219, green: 109, blue: 182 };

            expect(result).toEqual(expected);
        });
    });

    describe('ratio 1:1:1', () => {
        it('should mix 50ml', () => {
            const result = calculateFillColor({
                cyan: 50,
                magenta: 50,
                yellow: 50
            });
            const expected: RGBColor = { red: 170, green: 170, blue: 170 };
            expect(result).toEqual(expected);
        });
    
        it('should mix 100ml', () => {
            const result = calculateFillColor({
                cyan: 100,
                magenta: 100,
                yellow: 100
            });
            const expected: RGBColor = { red:  170, green: 170, blue: 170 };
            expect(result).toEqual(expected);
        });
    });
    

    it('should mix ratio 1:2:0', () => {
        const result = calculateFillColor({
            cyan: 50,
            magenta: 100,
            yellow: 0
        });
        const expected: RGBColor = { red: 170, green: 85, blue: 255 };
        expect(result).toEqual(expected);
    });

    it('should mix ratio 1:0:2', () => {
        const result = calculateFillColor({
            cyan: 50,
            magenta: 0,
            yellow: 100
        });
        const expected: RGBColor = { red: 170, green: 255, blue: 85 };
        expect(result).toEqual(expected);
    });

    it('should mix ratio 0:1:2', () => {
        const result = calculateFillColor({
            cyan: 0,
            magenta: 50,
            yellow: 100
        });
        const expected: RGBColor = { red: 255, green: 170, blue: 85 };
        expect(result).toEqual(expected);
    });

    it('should mix ratio 2:1:0', () => {
        const result = calculateFillColor({
            cyan: 100,
            magenta: 50,
            yellow: 0
        });
        const expected: RGBColor = { red: 85, green: 170, blue: 255 };
        expect(result).toEqual(expected);
    });

    it('should mix ratio 2:0:1', () => {
        const result = calculateFillColor({
            cyan: 100,
            magenta: 0,
            yellow: 50
        });
        const expected: RGBColor = { red: 85, green: 255, blue: 170 };
        expect(result).toEqual(expected);
    });

    it('should mix ratio 0:2:1', () => {
        const result = calculateFillColor({
            cyan: 0,
            magenta: 100,
            yellow: 50
        });
        const expected: RGBColor = { red: 255, green: 85, blue: 170 };
        expect(result).toEqual(expected);
    });
});

// TODO: some tests with white