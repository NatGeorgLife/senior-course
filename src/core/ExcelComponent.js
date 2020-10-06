import {DOMListener} from '@core/DOMListener.js'
export class ExcelComponent extends DOMListener {
    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name || ' '
    }

    // возвращает шаблон компонента
    toHTML() {
        return ''
    }
    init() {
        this.initDOMListeners()
    }
    destroy() {
        this.removeDOMListeners()
        this.$root.clear()
    }
}
