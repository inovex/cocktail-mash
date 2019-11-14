let HIGHSCORE: HighScore;
const LOCAL_STORAGE_KEY = 'godays_highscore';

export interface HighscoreEntry {
    name: string;
    score: number;
    uuid: string;
}

export interface HighScore {
    entries: HighscoreEntry[];
}

const compareFn = (a: HighscoreEntry, b: HighscoreEntry) => {
    if (a.score > b.score) {
        return -1;
    } else if (a.score === b.score) {
        return 0;
    } else {
        return 1;
    }
}

export const postHighScore = (entry: HighscoreEntry) => {
    if (typeof HIGHSCORE === 'undefined') {
        getHighScore();
    }
    HIGHSCORE.entries = HIGHSCORE.entries.concat(entry).sort(compareFn);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(HIGHSCORE));
}

export const getHighScore = () => {
    if (typeof HIGHSCORE === 'undefined') {
        const initialValue = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (initialValue === null) {
            HIGHSCORE = { entries: [] };
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(HIGHSCORE));
        } else {
            HIGHSCORE = JSON.parse(initialValue);
            HIGHSCORE.entries.sort(compareFn);
        }
    }
    return HIGHSCORE;
}

export const getPosition = (uuid: string) => {
    return HIGHSCORE.entries.findIndex(entry => entry.uuid === uuid) + 1;
}
