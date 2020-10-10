const CHARCODE = {
    A: 65,
    Z: 90
}
function createCel(_, index) {
    return `
        <div contenteditable data-col="${index}" class="row__cell"></div>
    `
}
function createCol(content, index) {
    return `
        <div data-type="resizable" data-col="${index}" class="row__column">
            ${content}
            <div class="column-resize" data-resize="col"></div>
        </div>
    `
}
function createRow(index, content) {
    const resizer = index ?
    '<div class="row-resize" data-resize="row"></div>' :
    ''
    return `
        <div data-type="resizable" class="row">
            <div class="row__info">
                ${index ? index : ''}
                ${resizer}
            </div>
            <div class="row__data">${content}</div>
        </div>
    `
}

function toChar(_, index) {
    return String.fromCharCode(CHARCODE.A + index)
}

export function createTable(rowsCount = 15) {
    const colsCount = CHARCODE.Z - CHARCODE.A + 1
    const rows = []

    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(createCol)
        .join('')

    rows.push(createRow(null, cols))


    for (let i = 0; i < rowsCount; i++) {
        const cels = new Array(colsCount)
            .fill('')
            .map(createCel)
            .join('')
        rows.push(createRow(i + 1, cels))
    }

    return rows.join('')
}
