import {defualtStyles, defualtTitle} from '@/constants.js';

const defaultState = {
    rowState: {},
    colState: {},
    dataState: {},
    stylesState: {},
    currentText: '',
    tableName: defualtTitle,
    currentStyles: defualtStyles,
    openedDate: new Date().toJSON()
}

const normalize = state => ({
    ...state,
    currentText: '',
    currentStyles: defualtStyles
})
export function normalizeInitialState(state) {
    return state ? normalize(state) : JSON.parse(JSON.stringify(defaultState))
}
