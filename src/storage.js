let data = {
    accounts: {},
}

let save = () => {
    localStorage.setItem('data', JSON.stringify(data))
}
let load = () => {
    let rawData = localStorage.getItem('data')
    if (rawData.length == 0) {
        return
    }
    data = JSON.parse(rawData)
}

export const saveAccounts = (accounts) => {
    data.accounts = accounts
    save()
}
export const loadAccounts = () => {
    load()
    return data.accounts
}
