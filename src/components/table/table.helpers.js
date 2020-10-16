import {range} from '@core/utils.js'

export function shouldResize(event) {
    return event.target.dataset.resize
}
export function isCell(event) {
    return event.target.dataset.type === 'cell'
}
export function matrix(target, current) {
    target = target.id(true)
    current = current.id(true)
    const cols = range(current.col, target.col)
    const rows = range(current.row, target.row)
    return rows.reduce((acc, row) => {
        cols.forEach(col => acc.push(`${row}:${col}`))
        return acc
    }, [])
}
export function nextSelector(key, row, col) {
    switch (key) {
        case 'Tab':
        case 'ArrowRight':
            col++
            break
        case 'ArrowLeft':
            col = col - 1 < 0 ? 0 : col - 1
            break
        case 'Enter':
        case 'ArrowDown':
            row++
            break
        case 'ArrowUp':
            row = row - 1 < 0 ? 0 : row - 1
            break
    }
    return `[data-id="${row || 0}:${col || 0}"]`
}
