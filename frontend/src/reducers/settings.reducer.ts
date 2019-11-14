export interface Settings {
    capacity: number;
    fillRate: number;
}

export const initialSettings: Settings = {
    capacity: 400,
    fillRate: 50
}

export enum SettingsActionType {
    SET_SETTINGS = 'SET_SETTINGS'
}

export const settingsReducer = (state = initialSettings, action: { type: SettingsActionType, payload: Partial<Settings>}) => {
    switch(action.type) {
        case SettingsActionType.SET_SETTINGS:
            return Object.assign({}, initialSettings, action.payload);

        default:
            return state;
    }
}