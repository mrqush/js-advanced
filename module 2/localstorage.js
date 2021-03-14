export function setItemsLocal(key, array) {
    localStorage.setItem(`${key}`, JSON.stringify(array));
}

export function getItemsLocal(key) {
    return JSON.parse(localStorage.getItem(`${key}`));
}

