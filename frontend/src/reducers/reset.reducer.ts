import { AnyAction } from 'redux';
import { RootActions } from './root.reducer';

export enum ResetActionType {
    SET_RESET_STATE = 'SET_RESET_STATE'
}

export const initialReset = false;

export const resetReducer = (state = initialReset, action: AnyAction): boolean => {
    switch (action.type) {
        case ResetActionType.SET_RESET_STATE:
            return action.payload;

        case RootActions.RESET:
            return initialReset;

        default:
            return state;
    }
}

export default resetReducer;
