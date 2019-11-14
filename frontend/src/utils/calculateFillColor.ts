import { FillState } from '../reducers/fills.reducer';
import { RGBColor } from './Color';

export const calculateFillColor = (fills: FillState): RGBColor => {
    // color mixing logic goes here
    // cyan: 00 FF FF
    // magenta: FF 00 FF
    // yellow: FF FF 00
    // white: FF FF FF
    /**
     * example:
     * 1x FF ED 00  // 255 237   0
     * 2x 00 ED FF  //   0 237 255
     * 1x FF FF FF  // 255 255 255
     *  =
     *    80 F2 BF  // 128 242 191 
     */
    const sumTotal = fills.cyan + fills.magenta + fills.yellow;
    const ratios = {
        cyan: fills.cyan / sumTotal || 0,
        magenta: fills.magenta / sumTotal || 0,
        yellow: fills.yellow / sumTotal || 0
    };
    const redValue = Math.round((ratios.magenta + ratios.yellow) * 255);
    const greenValue = Math.round((ratios.cyan + ratios.yellow) * 255);
    const blueValue = Math.round((ratios.cyan + ratios.magenta) * 255);
    return {
        blue: blueValue,
        green: greenValue,
        red: redValue
    }
}