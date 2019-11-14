export interface ScoreState {
    level1: number;
    level2: number;
    level3: number;
}

export enum ScoreActionType {
    SET_SCORE = 'SET_SCORE',
    RESET = 'RESET'
}

export const initialScore: ScoreState = {
    level1: 0,
    level2: 0,
    level3: 0
}

export interface ScoreAction {
    type: ScoreActionType,
    payload: {
        level: number;
        score: number;
    };
}

export const scoreReducer = (state = initialScore, action: ScoreAction) => {
    switch (action.type) {
        case ScoreActionType.SET_SCORE:
            return Object.assign({}, state, { [action.payload.level]: action.payload.score });
        
        case ScoreActionType.RESET:
            return Object.assign({}, initialScore);

        default:
            return state;
    }
}