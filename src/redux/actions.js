import {
    TABLE_RESIZE,
    TABLE_INPUT,
    CHANGE_STYLES,
    APPLY_STYLE,
    UPDATE_DATE,
    CHANGE_TABLENAME
} from '@/redux/types.js'

export function tableResize(data) {
    return {
        type: TABLE_RESIZE,
        data
    }
}
export function tableInput(data) {
    return {
        type: TABLE_INPUT,
        data
    }
}

export function changeStyles(data) {
    return {
        type: CHANGE_STYLES,
        data

    }
}
export function applyStyle(data) {
    return {
        type: APPLY_STYLE,
        data
    }
}
export function changeTableName(data) {
    return {
        type: CHANGE_TABLENAME,
        data
    }
}
export function updateDate() {
    return {
        type: UPDATE_DATE
    }
}
