import {DOMListener} from '@core/DOMListener.js'
export class ExcelComponent extends DOMListener {
    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name || ' '
        this.emitter = options.emitter
        this.unsubscribers = []
        this.prepare()
    }

    // возвращает шаблон компонента
    toHTML() {
        return ''
    }
    $emit(event, ...args) {
        this.emitter.emit(event, ...args)
    }
    $on(event, func) {
        const unsub = this.emitter.subscribe(event, func)
        this.unsubscribers.push(unsub)
    }
    prepare() {

    }
    init() {
        this.initDOMListeners()
    }
    destroy() {
        this.$root.clear()
        this.removeDOMListeners()
        this.unsubscribers.forEach(unsub => unsub())
    }
}
