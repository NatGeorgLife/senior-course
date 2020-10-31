import {Page} from '@core/Page.js'
import {$} from '@core/DOM.js'
import {createRecordsTable} from './dashboard.functions.js'

export class DashboardPage extends Page {
    getRoot() {
        const now = Date.now().toString()
        return $.create('div', 'dashboard').html(
            `<div class="dashboard__header">
                <h1>Excel Dashboard</h1>
            </div>
            <div class="dashboard__panel">
                <div class="_view">
                    <a href="#excel/${now}" class="dashboard__create">
                        Новая<br>Таблица
                    </a>
                </div>
            </div>
            <div class="dashboard__list list">
                <div class="_view">
                    ${createRecordsTable()}
                </div>
            </div>`
        ).$el // <<< костыль <<<<<<<<<<<<<<<<<<<<<<<<<<<<
    }
}
