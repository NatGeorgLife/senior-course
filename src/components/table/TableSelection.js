export class TableSelection {
    static className = 'selected'
    constructor() {
        this.group = []
        this.current = null
    }
    select($el) {
        this.unselectAll()
        this.current = $el
        this.group.push($el)
        $el.focus().addClass(TableSelection.className)
    }
    unselectAll() {
        this.group.forEach($el => $el.remClass(TableSelection.className))
        this.group = []
    }
    selectGroup(group) {
        this.unselectAll()
        this.group = group
        this.group.forEach($el => $el.addClass(TableSelection.className))
    }
    applyStyle(style) {
        this.group.forEach($el => $el.css(style))
    }

    get selectedIds() {
        return this.group.map(el => el.id())
    }
}
