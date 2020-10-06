const CHARCODE = {
    A: 65,
    Z: 90
}
function createCel() {
    return `
        <div contenteditable class="row__cell"></div>
    `
}
function createCol(content) {
    return `
        <div class="row__column">${content}</div>
    `
}
function createRow(index, content) {
    return `
        <div class="row">
            <div class="row__info">${index ? index : ''}</div>
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
