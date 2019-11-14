import { AnyAction } from 'redux';
import { RootActions } from './root.reducer';

export enum TimestampActionType {
    SET_TIMESTAMP = 'SET_TIMESTAMP'
}

export const initialTimestamp = Date.now().toString();

export const timestampReducer = (state = initialTimestamp, action: AnyAction): string => {
    switch (action.type) {
        case TimestampActionType.SET_TIMESTAMP:
            return Date.now().toString();

        case RootActions.RESET:
            return initialTimestamp;

        default:
            return state;
    }
}

export default timestampReducer;
