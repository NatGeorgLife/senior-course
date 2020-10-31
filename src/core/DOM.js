export class DOM {
    constructor(selector) {
        this.$el = typeof selector === 'string' ?
            document.querySelector(selector) :
            selector
    }
    html(html) {
        if (typeof html === 'string') {
            this.$el.innerHTML = html
            return this
        } else {
            return this.$el.outerHTML
        }
    }
    text(text) {
        if (typeof text !== 'undefined') {
            this.$el.textContent = text
            return this
        }
        if (this.$el.tagName.toLowerCase() === 'input') {
            return this.$el.value.trim()
        }
        return this.$el.textContent.trim()
    }
    clear() {
        this.html('')
        return this
    }
    append(node) {
        if (node instanceof DOM) {
            node = node.$el
        }

        if (Element.prototype.append) {
            this.$el.append(node)
        } else {
            this.$el.appendChild(node)
        }

        return this
    }
    on(event, callback) {
        this.$el.addEventListener(event, callback)
    }
    off(event, callback) {
        this.$el.removeEventListener(event, callback)
    }
    find(selector) {
        return $(this.$el.querySelector(selector))
    }
    findAll(selector) {
        return this.$el.querySelectorAll(selector)
    }
    get data() {
        return this.$el.dataset
    }
    id(parse) {
        if (parse) {
            const parsed = this.id().split(':')
            return {
                row: +parsed[0],
                col: +parsed[1]
            }
        }
        return this.data.id
    }
    closest(selector) {
        return $(this.$el.closest(selector))
    }
    getCoords() {
        return this.$el.getBoundingClientRect()
    }
    css(options = {}) {
        Object.keys(options).forEach(key => {
            this.$el.style[key] = options[key]
        })
    }
    getStyles(styles = []) {
        return styles.reduce((acc, style) => {
            acc[style] = this.$el.style[style]
            return acc
        }, {})
    }
    addClass(className) {
        this.$el.classList.add(className)
        return this
    }
    remClass(className) {
        this.$el.classList.remove(className)
        return this
    }
    focus() {
        this.$el.focus()
        return this
    }
    attr(name, value) {
        if (value !== undefined) {
            this.$el.setAttribute(name, value)
            return this
        } else {
            return this.$el.getAttribute(name)
        }
    }
}

export function $(selector) {
    return new DOM(selector)
}

$.create = (tagName, classes) => {
    const el = document.createElement(tagName)
    if (classes) {
        el.classList.add(classes)
    }
    return $(el)
}
