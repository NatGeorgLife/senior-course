import {ExcelComponent} from './ExcelComponent.js';

export class ExcelStateComponent extends ExcelComponent {
    constructor(...args) {
        super(...args)
    }

    get template() {
        throw new Error('Not implemented template getter')
    }

    initState(initialState = {}) {
        this.state = {...initialState}
    }

    setState(newState) {
        this.state = {...this.state, ...newState}
        this.$root.html(this.template)
    }
}
