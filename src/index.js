import {Excel} from '@/components/excel/Excel.js'
import {Header} from '@/components/header/Header.js';
import {Toolbar} from '@/components/toolbar/Toolbar.js';
import {Formula} from '@/components/formula/Formula.js';
import {Table} from '@/components/table/Table.js';
import {createStore} from '@core/createStore';
import {rootReducer} from '@/redux/rootReducer';
import {storage, debounce} from '@core/utils';
import {initialState} from '@/redux/initialState';
import './scss/index.scss'

const store = createStore(rootReducer, initialState)

const stateListener = debounce(state => {
    storage('excel-state', state)
    console.log('state changed: ', storage('excel-state'));
}, 300)

store.subscribe(stateListener)

const excel = new Excel('#app', {
    components: [Header, Toolbar, Formula, Table],
    store: store
})

excel.render()
