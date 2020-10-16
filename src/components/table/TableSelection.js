export class TableSelection {
    static className = 'selected'
    constructor() {
        this.group = []
        this.current = null
    }
    select($el) {
        this.current = $el
        this.group.push($el)
        $el.focus().addClass(TableSelection.className)
    }
    unselect($el) {
        this.group = this.group.filter(item => item !== $el)
        $el.remClass(TableSelection.className)
    }
    unselectAll() {
        this.group.forEach(this.unselect.bind(this))
    }
    selectGroup(group) {
        this.unselectAll()
        this.group = group
        this.group.forEach($el => $el.addClass(TableSelection.className))
    }
}
