import { combineReducers } from 'redux';
import { buttonsReducer, ButtonsState, initialButtons } from './buttons.reducer';
import { fillsReducer, FillState, initialFills } from './fills.reducer';
import { initialLevel, Level, levelReducer } from './level.reducer';
import { initialReset, resetReducer } from './reset.reducer';
import { initialScore, scoreReducer, ScoreState } from './score.reducer';
import { initialSettings, Settings, settingsReducer } from './settings.reducer';
import { initialTimestamp, timestampReducer } from './timestamp.reducer';

export enum RootActions {
    RESET = "RESET"
}

export interface AppState {
    buttons: ButtonsState;
    fills: FillState;
    level: Level;
    reset: boolean;
    score: ScoreState;
    settings: Settings;
    timestamp: string;
}

export const initialState: AppState = {
    buttons: initialButtons,
    fills: initialFills,
    level: initialLevel,
    reset: initialReset,
    score: initialScore,
    settings: initialSettings,
    timestamp: initialTimestamp
}

export const rootReducer = combineReducers({
    buttons: buttonsReducer,
    fills: fillsReducer,
    level: levelReducer,
    reset: resetReducer,
    score: scoreReducer,
    settings: settingsReducer,
    timestamp: timestampReducer
  })

export default rootReducer;