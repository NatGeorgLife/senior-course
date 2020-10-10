import {capitalize} from '@core/utils.js'

export class DOMListener {
    constructor($root, listeners = []) {
        if (!$root) {
            throw new Error('No $root provided for DOMListener')
        }
        this.$root = $root,
        this.listeners = listeners
    }
    initDOMListeners() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            if (! this[method]) {
                throw new Error(
                    `Method ${method} is not implemented in ${this.name}`
                )
            }
            this[method] = this[method].bind(this)
            this.$root.on(listener, this[method])
        })
    }
    removeDOMListeners() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            this.$root.off(listener, this[method])
        })
    }
}

function getMethodName(event) {
    return 'on' + capitalize(event)
}
