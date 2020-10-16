export class Emitter {
    constructor() {
        this.listeners = {}
    }
    emit(event, ...args) {
        if (Array.isArray(this.listeners[event])) {
            this.listeners[event].forEach(listener => listener(...args))
        }
    }
    subscribe(event, func) {
        this.listeners[event] = this.listeners[event] || []
        this.listeners[event].push(func)
        return () => {
            this.listeners[event] =
                this.listeners[event].filter(fn => fn !== func)
        }
    }
}
