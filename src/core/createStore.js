export function createStore(rootReducer, initialState = {}) {
    let state = rootReducer({...initialState}, {type: '__INIT__'})
    let listeners = []

    return {
        subscribe(func) {
            listeners.push(func)
            return {
                unsubscribe() {
                    listeners = listeners.filter(lis => lis !== func)
                }
            }
        },
        dispatch(action) {
            state = rootReducer(state, action)
            listeners.forEach(listener => listener(state))
        },
        getState() {
            return JSON.parse(JSON.stringify(state))
        }
    }
}
