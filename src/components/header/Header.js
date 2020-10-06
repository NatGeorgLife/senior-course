import {ExcelComponent} from '@core/ExcelComponent.js'

export class Header extends ExcelComponent {
    static className = 'header'
    toHTML() {
        return `
            <input type="text" value="Новая таблица" class="header__input" />
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
}
