import {
    TABLE_RESIZE,
    TABLE_INPUT,
    CHANGE_STYLES,
    APPLY_STYLE,
    CHANGE_TABLENAME
} from '@/redux/types.js'

export function rootReducer(state, action) {
    let field
    let val
    switch (action.type) {
        case TABLE_RESIZE:
            field = action.data.type === 'col' ? 'colState' : 'rowState'
            return {...state, [field]: value(state, field, action)}
        case TABLE_INPUT:
            field = 'dataState'
            return {
                ...state,
                [field]: value(state, field, action),
                currentText: action.data.value
            }
        case CHANGE_STYLES:
            return {...state, currentStyles: action.data}
        case APPLY_STYLE:
            field = 'stylesState'
            val = state[field] || {}
            action.data.ids.forEach(id => {
                val[id] = {...val[id], ...action.data.value}
            })
            return {
                ...state,
                [field]: val,
                currentStyles: {...state.currentStyles, ...action.data.value}
            }
        case CHANGE_TABLENAME:
            return {...state, tableName: action.data}
        default: return state
    }
}

function value(state, field, action) {
    const val = state[field] || {}
    val[action.data.id] = action.data.value
    return val
}
