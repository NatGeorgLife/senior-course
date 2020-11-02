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

class StateProcessor {
    constructor(client, delay = 300) {
        this.client = client
        this.listen = debounce(this.listen.bind(this), delay)
    }
    listen(state) {
        this.client.save(state)
    }
    get() {
        return this.client.get()
    }
}

class LocalStorageClient {
    constructor(name) {
        this.name = storageName(name)
    }
    save(state) {
        storage(this.name, state)
        console.log('state: ', state)
        return Promise.resolve()
    }
    get() {
        // return Promise.resolve(storage(this.name))
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(storage(this.name))
            }, 3000)
        })
    }
}

export class ExcelPage extends Page {
    constructor(param) {
        super(param)
        this.storeSub = {}
        this.processor = new StateProcessor(
            new LocalStorageClient(this.param)
        )
    }
   async getRoot() {
        const state = await this.processor.get()
        const store = createStore(rootReducer, normalizeInitialState(state))
        this.storeSub = store.subscribe(this.processor.listen)

        this.excel = new Excel({
            components: [
                Header,
                Toolbar,
                Formula,
                Table
            ],
            store: store
        })

        return this.excel.getRoot()
    }
    afterRender() {
        this.excel.init()
    }
    destroy() {
        this.storeSub.unsubscribe()
        this.excel.destroy()
    }
}
