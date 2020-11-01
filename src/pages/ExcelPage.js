import {Page} from '@core/Page.js'
import {Excel} from '@/components/excel/Excel.js'
import {Header} from '@/components/header/Header.js';
import {Toolbar} from '@/components/toolbar/Toolbar.js';
import {Formula} from '@/components/formula/Formula.js';
import {Table} from '@/components/table/Table.js';
import {createStore} from '@core/store/createStore';
import {rootReducer} from '@/redux/rootReducer';
import {storage, debounce} from '@core/utils';
import {normalizeInitialState} from '@/redux/initialState';

function storageName(param) {
    return 'excel:' + param
}

export class ExcelPage extends Page {
    getRoot() {
        const param = this.param ? this.param : Date.now().toString()

        const state = storage(storageName(param))
        const store = createStore(rootReducer, normalizeInitialState(state))

        const stateListener = debounce(state => {
            if (process.env.NODE_ENV === 'development') {
                console.log('state changed: ', state)
            }
            storage(storageName(param), state)
        }, 300)

        store.subscribe(stateListener)

        this.excel = new Excel({
            components: [Header, Toolbar, Formula, Table],
            store: store
        })

        return this.excel.getRoot()
    }
    afterRender() {
        this.excel.init()
    }
    destroy() {
        this.excel.destroy()
    }
}
