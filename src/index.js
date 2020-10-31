import {Router} from '@core/route/Router.js'
import {ExcelPage} from '@/pages/ExcelPage.js'
import {DashboardPage} from '@/pages/DashboardPage.js'
import './scss/index.scss'

new Router('#app', {
    dashboard: DashboardPage,
    excel: ExcelPage
})
