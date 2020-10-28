import {ExcelComponent} from '@core/ExcelComponent.js'
import {$} from '@core/DOM'

export class Formula extends ExcelComponent {
    static className = 'formula'

    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            subscribe: ['currentText'],
            ...options
        })
    }

    toHTML() {
        return `
            <div class="formula__info">fx</div>
            <div 
                class="formula__input" 
                contenteditable 
                spellcheck="false"
                data-type="formula"
            ></div>
        `
    }
    init() {
        super.init()
        this.$formula = this.$root.find('[data-type="formula"]')
        this.$on('cell:select', $cell => this.$formula.text($cell.data.value))
    }
    storeChanged({currentText}) {
        this.$formula.text(currentText)
    }
    onInput(event) {
        this.$emit('formula:input', $(event.target).text())
    }
    onKeydown(event) {
        if (event.key === 'Enter' || event.key === 'Tab') {
            event.preventDefault()
            this.$emit('formula:enter')
        }
    }
}
