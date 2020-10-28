import {$} from '@core/dom.js'

export function tableResizeHandler($root, event) {
    return new Promise(resolve => {
        const $resizer = $(event.target)
        const $parent = $resizer.closest('[data-type="resizable"]')
        const cords = $parent.getCoords()
        const type = $resizer.data.resize
        const size = {}
        document.onmousemove = event => {
            if (type === 'col') {
                size.col = event.clientX - cords.x
                $resizer.css({
                    left: size.col - $resizer.getCoords().width + 'px'
                })
            } else {
                size.row = event.clientY - cords.y
                $resizer.css({
                    top: size.row - $resizer.getCoords().height + 'px'
                })
            }
        }
        document.onmouseup = event => {
            document.onmousemove = null
            document.onmouseup = null
            if (type === 'col') {
                $parent.css({width: size.col + 'px'})
                $root.findAll(`[data-col="${$parent.data.col}"]`)
                    .forEach(cell => cell.style.width = size.col + 'px')
            } else {
                $parent.css({height: size.row + 'px'})
            }
            resolve({
                type,
                id: type === 'col' ? $parent.data.col : $parent.data.row,
                value: type === 'col' ? size.col : size.row
            })
        }
    })
}
