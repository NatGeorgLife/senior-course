import {storage} from '@core/utils';
export function toHTML(key) {
    const model = storage(key)
    const id = key.split(':')[1]
    return `
        <li class="list__record">
            <a href="#excel/${id}">${model.tableName}</a>
            <strong>
                ${new Date(model.openedDate).toLocaleDateString()}
                ${new Date(model.openedDate).toLocaleTimeString()}
            </strong>
        </li>
    `
}

function getAllKeys() {
    const keys = []
    for (let i = 0; i< localStorage.length; i++) {
        const key = localStorage.key(i)
        if (!key.includes('excel')) continue
        keys.push(key)
    }
    return keys
}

export function createRecordsTable() {
    const keys = getAllKeys()
    if (keys.length === 0) {
        return `
        <p style="text-align: center">
            Вы пока ни создали не одной таблицы
        </p>
        `
    }

    return `
        <div class="list__header">
            <span>Название</span>
            <span>Дата открытия</span>
        </div>
        <ul class="list__content">
            ${keys.map(toHTML).join('')}
        </ul>
    `
}
