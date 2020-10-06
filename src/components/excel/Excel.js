import {$} from '@core/dom.js'

export class Excel {
    constructor(selector, option) {
        this.$el = $(selector)
        this.components = option.components || []
    }
    getRoot() {
        const $root = $.create('div', 'excel')

        this.components = this.components.map(Component => {
            const $el = $.create('div', Component.className)
            const component = new Component($el)
            $el.html(component.toHTML())
            $root.append($el)
            return component
        })

        return $root
    }
    render() {
        this.$el.append(this.getRoot())
        this.components.forEach(component => component.init())
    }
    remove(name) {
        this.components.forEach(component => {
            if (component.name === name) {
                component.destroy()
            }
        })
    }
}
