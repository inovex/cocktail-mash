export interface FillState {
    cyan: number;
    magenta: number;
    yellow: number;
}

export const initialFills: FillState = {
    cyan: 0,
    magenta: 0,
    yellow: 0
}

export enum FillActionType {
    INCREMENT = "INCREMENT",
    RESET = "RESET",
    RESET_FILL = "RESET_FILL"
}

export const fillsReducer = (state = initialFills, action: { type: FillActionType, payload: { key: keyof FillState, value: number } }) => {
    switch (action.type) {
        case FillActionType.INCREMENT:
            return Object.assign({}, state, { [action.payload.key]: state[action.payload.key] + action.payload.value })

        case FillActionType.RESET:
        case FillActionType.RESET_FILL:
            return Object.assign({}, initialFills);

        default:
            return state;
    }
}