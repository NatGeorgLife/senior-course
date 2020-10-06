import {ExcelComponent} from '@core/ExcelComponent.js'

export class Formula extends ExcelComponent {
    static className = 'formula'

    constructor($root) {
        super($root, {
            name: 'Formula',
            listeners: ['click', 'input']
        })
    }

    toHTML() {
        return `
            <div class="formula__info">fx</div>
            <div class="formula__input" contenteditable spellcheck="false">
            </div>
        `
    }
    onInput(event) {
        console.log(event);
    }
    onClick(event) {
        console.log(event);
    }
}
