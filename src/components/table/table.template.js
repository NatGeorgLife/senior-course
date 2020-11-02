import {defualtStyles} from '@/constants.js'
import {toInlineStyles} from '@core/utils.js'
import {parse} from '@core/parse'

const INITIAL_WIDTH = 120
const INITIAL_HEIGHT = 24
const CHARCODE = {
    A: 65,
    Z: 90
}
function createCell(row, state) {
    return function(_, index) {
    const id = `${row}:${index}`
    const width = getWidth(state, index)
    const content = state.dataState[id] || ''
    const styles = toInlineStyles({...defualtStyles, ...state.stylesState[id]})

        return `
            <div 
            contenteditable 
            data-type="cell"
            data-col="${index}"
            data-value="${content}"
            data-id="${id}"
            style="${styles}; width: ${width}px" 
            class="row__cell">${parse(content)}</div>
        `
    }
}
function createCol({content, index, width}) {
    return `
        <div 
        data-type="resizable" 
        data-col="${index}" 
        style="width: ${width}px"
        class="row__column">
            ${content}
            <div class="column-resize" data-resize="col"></div>
        </div>
    `
}
function createRow(index, content, state) {
    const height = getHeight(state, index)
    const resizer = index != null ?
    '<div class="row-resize" data-resize="row"></div>' :
    ''
    return `
        <div 
        data-type="resizable" 
        data-row="${index}" 
        style="height: ${height}px"
        class="row">
            <div class="row__info">
                ${index == null ? '' : index+1}
                ${resizer}
            </div>
            <div class="row__data">${content}</div>
        </div>
    `
}

function toChar(_, index) {
    return String.fromCharCode(CHARCODE.A + index)
}

function getWidth(state, index) {
    return (state.colState[index] || INITIAL_WIDTH)
}
function getHeight(state, index) {
    return (state.rowState[index] || INITIAL_HEIGHT)
}
function withWidthFrom(state) {
    return function(content, index) {
        return {content, index, width: getWidth(state, index)}
    }
}

export function createTable(rowsCount = 15, state = {}) {
    const colsCount = CHARCODE.Z - CHARCODE.A + 1
    const rows = []
    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(withWidthFrom(state))
        .map(createCol)
        .join('')
    rows.push(createRow(null, cols, state))

    for (let i = 0; i < rowsCount; i++) {
        const cels = new Array(colsCount)
            .fill('')
            .map(createCell(i, state))
            .join('')
        rows.push(createRow(i, cels, state))
    }

    return rows.join('')
}
