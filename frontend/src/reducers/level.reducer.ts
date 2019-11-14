export enum Level {
    Tutorial = 0,
    Level1 = 1,
    Level2 = 2,
    Level3 = 3,
    ScoreScreen = 4,
    HighscoreScreen = 5
}

export enum LevelActionType {
    RESET = 'RESET',
    NEXT_LEVEL = 'NEXT_LEVEL',
    SET_LEVEL = 'SET_LEVEL'
}

export interface LevelAction {
    type: LevelActionType;
    payload?: Level;
}

export const initialLevel: Level = Level.Tutorial;

export const levelReducer = (state = initialLevel, action: LevelAction) => {
    switch (action.type) {
        case LevelActionType.RESET:
            return initialLevel;

        case LevelActionType.NEXT_LEVEL:
            return Level[state + 1] ? (state + 1) : initialLevel;

        case LevelActionType.SET_LEVEL:
            return action.payload;
        
        default:
            return state;
    }
}

export default levelReducer;
