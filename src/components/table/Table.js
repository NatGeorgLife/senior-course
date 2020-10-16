import {$} from '@core/DOM.js'
import {ExcelComponent} from '@core/ExcelComponent.js'
import {isCell, shouldResize, matrix, nextSelector} from './table.helpers.js'
import {tableResizeHandler} from './table.resize.js'
import {createTable} from './table.template.js'
import {TableSelection} from './TableSelection.js'

export class Table extends ExcelComponent {
    static className = 'table'
    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        })
    }
    toHTML() {
        return createTable(20)
    }
    prepare() {
        this.selection = new TableSelection()
    }
    init() {
        super.init()
        const $cell = this.$root.find('[data-id="0:0"]')
        this.selection.select($cell)
        this.$emit('table:shift', $cell.text())
        this.$on('formula:input', text => {
            this.selection.current.text(text)
        })
        this.$on('formula:enter', () => {
            this.selection.current.focus()
        })
    }
    onMousedown(event) {
        if (shouldResize(event)) {
            tableResizeHandler(this.$root, event)
        } else if (isCell(event)) {
            const $target = $(event.target)
            this.$emit('cell:click', $target.text())
            if (event.shiftKey) {
                const cells = matrix($target, this.selection.current)
                .map(id => this.$root.find(`[data-id="${id}"]`))
                this.selection.selectGroup(cells)
            } else {
                this.selection.unselectAll()
                this.selection.select($target)
            }
        }
    }
    onKeydown(event) {
        const keys = [
            'Tab',
            'Enter',
            'ArrowRight',
            'ArrowLeft',
            'ArrowDown',
            'ArrowUp'
        ]

        const {row, col} = this.selection.current.id(true)
        if (keys.includes(event.key) && !event.shiftKey) {
            const id = this.$root.find(nextSelector(event.key, row, col))
            this.selection.unselectAll()
            this.selection.select(id)
            this.$emit('table:shift', id.text())
            event.preventDefault()
        }
    }
    onInput(event) {
        if (isCell(event)) {
            const data = event.target.textContent
            this.$emit('cell:input', data)
        }
    }
}

