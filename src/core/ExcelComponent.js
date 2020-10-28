import {DOMListener} from '@core/DOMListener.js'
export class ExcelComponent extends DOMListener {
    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name || ''
        this.subscribe = options.subscribe || []
        this.emitter = options.emitter
        this.unsubscribers = []
        this.store = options.store

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
    $dispatch(action) {
        this.store.dispatch(action)
    }
    storeChanged() {

    }
    isWatching(key) {
        return this.subscribe.includes(key)
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
