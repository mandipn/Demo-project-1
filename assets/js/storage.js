
export function deleteDataFromLocalStorage(key) {
    localStorage.removeItem(key)
}

export function storeDataToLocalStorage(key, data) {
    if (typeof data !== "object") {
        localStorage.setItem(key, data)
    } else {
        localStorage.setItem(key, JSON.stringify(data))
    }
}

export function getDataFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}
