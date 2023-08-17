if (!window.utools) {
  window.utools = {
    dbStorage: {
      getItem (key) {
        const value = localStorage.getItem(key)
        return value ? JSON.parse(value) : value
      },
      setItem (key, value) {
        const jsonValue = JSON.stringify(value)
        localStorage.setItem(key, jsonValue)
      },
      removeItem: localStorage.removeItem
    }
  }
}

export function getItem (key) {
  return window.utools.dbStorage.getItem(key)
}

export function setItem (key, value) {
  return window.utools.dbStorage.setItem(key, value)
}

export function removeItem (key) {
  return window.utools.dbStorage.removeItem(key)
}
