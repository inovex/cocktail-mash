// import { AnyAction } from 'redux';
// import { RootActions } from './root.reducer';

export interface ButtonsState {
    cyan: boolean;
    magenta: boolean;
    yellow: boolean;
    reset: boolean;
    continue: boolean;
    [k: string]: boolean;
}

export enum ButtonsActionType {
    SET_STATE = 'SET_STATE',
    SET_BUTTON = 'SET_BUTTON',
    RESET = 'RESET'
}

export interface ButtonsAction {
    type: ButtonsActionType,
    payload?: Partial<ButtonsState> | {
        key: string;
        value: boolean;
    };
}

export const initialButtons: ButtonsState = {
    continue: false,
    cyan: false,
    magenta: false,
    reset: false,
    yellow: false
}

export const buttonsReducer = (state = initialButtons, action: ButtonsAction) => {
    switch (action.type) {
        case ButtonsActionType.SET_STATE:
            return Object.assign({}, initialButtons, action.payload);
        
        case ButtonsActionType.SET_BUTTON:
            if (action.payload && 'key' in action.payload && state[action.payload.key as string] !== action.payload.value) {
                return Object.assign({}, state, { [action.payload.key as string]: action.payload.value });
            } else {
                return state;
            }
        
        case ButtonsActionType.RESET:
            return Object.assign({}, initialButtons);

        default:
            return state;
    }
}