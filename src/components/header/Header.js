import {ExcelComponent} from '@core/ExcelComponent.js'
import {$} from '@core/DOM'
import {changeTableName} from '@/redux/actions'
import {ActiveRoute} from '@core/route/ActiveRoute.js'

export class Header extends ExcelComponent {
    static className = 'header'

    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input', 'click'],
            ...options
        })
    }

    toHTML() {
        const tableName = this.store.getState().tableName
        return `
            <input type="text" value="${tableName}" class="header__input" />
            <div>
                <div data-button="delete" class="header__button">
                    <i class="material-icons">delete</i>
                </div>
                <div data-button="exit" class="header__button">
                    <i class="material-icons">exit_to_app</i>
                </div>
            </div>
        `
    }
    onInput(event) {
        const $target = $(event.target)
        this.$dispatch(changeTableName($target.text()))
    }
    onClick(event) {
        const $target = $(event.target.closest('[data-button]'))
        if ($target.data.button === 'exit') {
            ActiveRoute.navigate('')
        } else if ($target.data.button === 'delete') {
            const decision = confirm('Вы действительно хотите удалить таблицу?')
            if (decision) {
                const path = ActiveRoute.path.split('/').join(':')
                localStorage.removeItem(path)
                ActiveRoute.navigate('')
            }
        }
    }
}
