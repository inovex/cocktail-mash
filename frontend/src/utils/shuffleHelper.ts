import { calculateFillColor } from './calculateFillColor';

const shuffle = (a: any[]) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

export const calcTargetColor1 = (colors: string[]) => {
    return calculateFillColor({
        [colors[0]]: 60,
        [colors[1]]: 30,
        [colors[2]]: 10
    } as any);
}

export const calcTargetColor2 = (colors: string[]) => {
    return calculateFillColor({
        [colors[0]]: 90,
        [colors[1]]: 50,
        [colors[2]]: 30
    } as any);
}

export const calcTargetColor3 = (colors: string[]) => {
    return calculateFillColor({
        [colors[0]]: 40,
        [colors[1]]: 20,
        [colors[2]]: 10
    } as any);
}

export const getShuffledColors = () => shuffle(['cyan', 'magenta', 'yellow']);
