import {$} from '@core/dom.js'
import {createToolbar} from './toolbar.template';
import {ExcelStateComponent} from '@core/ExcelStateComponent.js';
import {defualtStyles} from '@/constants.js';

export class Toolbar extends ExcelStateComponent {
    static className = 'toolbar'

    constructor($root, options) {
        super($root, {
            name: 'Toolbar',
            listeners: ['click'],
            subscribe: ['currentStyles'],
            ...options
        })
    }
    prepare() {
        this.initState(defualtStyles)
    }
    get template() {
        return createToolbar(this.state)
    }
    toHTML() {
        return this.template
    }
    onClick(event) {
       const $target = $(event.target.closest('[data-type="button"]'))
       const value = JSON.parse($target.data.value)
       this.$emit('toolbar:applyStyle', value)
    }
    storeChanged({currentStyles}) {
        this.setState(currentStyles)
    }
}
