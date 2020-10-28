import {storage} from '@core/utils.js';
import {defualtStyles, defualtTitle} from '@/constants.js';

const defaultState = {
    rowState: {},
    colState: {},
    dataState: {},
    stylesState: {},
    currentText: '',
    tableName: defualtTitle,
    currentStyles: defualtStyles
}

const normalize = state => ({
    ...state,
    currentText: '',
    currentStyles: defualtStyles
})

export const initialState = storage('excel-state') ?
    normalize(storage('excel-state')) :
    defaultState

