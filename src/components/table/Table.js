import {$} from '@core/DOM.js'
import {ExcelComponent} from '@core/ExcelComponent.js'
import {isCell, shouldResize, matrix, nextSelector} from './table.helpers.js'
import {tableResizeHandler} from './table.resize.js'
import {createTable} from './table.template.js'
import {TableSelection} from './TableSelection.js'
import * as actions from '@/redux/actions.js'
import {defualtStyles} from '@/constants.js'
import {parse} from '@core/parse.js'

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
        return createTable(20, this.store.getState())
    }
    prepare() {
        this.selection = new TableSelection()
    }

    init() {
        super.init()
        this.selectCell(this.$root.find('[data-id="0:0"]'))
        this.$on('formula:input', text => {
            this.selection.current
                .attr('data-value', text)
                .text(parse(text))

            this.updateTextInStore(text)
        })
        this.$on('formula:enter', () => this.selection.current.focus())
        this.$on('toolbar:applyStyle', value => {
            this.selection.applyStyle(value)
            this.$dispatch(actions.applyStyle({
                value,
                ids: this.selection.selectedIds
            }))
        })
    }
    resizeTable(event) {
        tableResizeHandler(this.$root, event)
            .then(data => this.$dispatch(actions.tableResize(data)))
    }
    selectCell($cell) {
        this.selection.select($cell)
        this.$emit('cell:select', $cell)
        const styles = $cell.getStyles(Object.keys(defualtStyles))
        this.$dispatch(actions.changeStyles(styles))
    }
    onMousedown(event) {
        if (shouldResize(event)) {
            this.resizeTable(event)
        } else if (isCell(event)) {
            const $target = $(event.target)

            if (event.shiftKey) {
                const cells = matrix($target, this.selection.current)
                    .map(id => this.$root.find(`[data-id="${id}"]`))
                this.selection.selectGroup(cells)
            } else {
                this.selectCell($target)
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
            this.selectCell(id)
            event.preventDefault()
        }
    }
    onInput(event) {
        if (isCell(event)) {
            this.updateTextInStore($(event.target).text())
            $(event.target).attr('data-value', $(event.target).text()) // ?
        }
    }
    updateTextInStore(data) {
        this.$dispatch(actions.tableInput({
            id: this.selection.current.id(),
            value: data
        }))
    }
}

