import {ExcelComponent} from '@core/ExcelComponent.js'
import {$} from '@core/DOM'
import {changeTableName} from '@/redux/actions'

export class Header extends ExcelComponent {
    static className = 'header'

    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input'],
            ...options
        })
    }

    toHTML() {
        const tableName = this.store.getState().tableName
        return `
            <input type="text" value="${tableName}" class="header__input" />
            <div>
                <div class="header__button">
                    <i class="material-icons">delete</i>
                </div>
                <div class="header__button">
                    <i class="material-icons">exit_to_app</i>
                </div>
            </div>
        `
    }
    onInput(event) {
        const $target = $(event.target)
        this.$dispatch(changeTableName($target.text()))
    }
}
