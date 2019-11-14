import { SERVER_API_URL } from '../config';
import { FillState } from '../reducers/fills.reducer';
import { Level } from '../reducers/level.reducer';

export const postSpill = () => {
    fetch(`${SERVER_API_URL}/spilled`, {
        method: "POST"
    }).then(() => {
        //
    });
}

export const postLevelStats = (levelStats: FillState & { level: Level, points: number }) => {
    fetch(`${SERVER_API_URL}/stats/stages`, {
        body: JSON.stringify(levelStats),
        // headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json'
        // },
        method: "POST",
    }).then(() => {
        //
    });
}

export const postFinalScore = (levelStats: { points: number }) => {
    fetch(`${SERVER_API_URL}/stats`, {
        body: JSON.stringify(levelStats),
        method: "POST",
    }).then(() => {
        //
    });
}
