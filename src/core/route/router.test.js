import {Router} from './Router.js'
import {Page} from '../Page.js'

class DashboardPage extends Page {
    getRoot() {
        const root = document.createElement('div')
        root.innerHTML = 'Hello!'
        return root
    }
}
class ExcelPage extends Page {}

describe('Router', () => {
    let router
    let $root
    beforeEach(() => {
        $root = document.createElement('div')
        router = new Router($root, {
            dashboard: DashboardPage,
            excel: ExcelPage
        })
    })

    test('should be defined', () => {
        expect(router).toBeDefined()
    })
    test('router should render Dashboard Page', () => {
        router.changePageHandler()
        expect($root.innerHTML).toBe('<div>Hello!</div>')
    })
})
