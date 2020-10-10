import {ExcelComponent} from '@core/ExcelComponent.js'
import {shouldResize} from './table.helpers.js'
import {tableResizeHandler} from './table.resize.js'
import {createTable} from './table.template.js'

export class Table extends ExcelComponent {
    static className = 'table'
    constructor($root) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown']
        })
    }
    toHTML() {
        return createTable(20)
    }
    onMousedown(event) {
        if (shouldResize(event)) {
            tableResizeHandler(this.$root, event)
        }
    }
}

