let data = {
    accounts: [],
    launchers: [],
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

export default {
    saveAccounts: (accounts) => {
        data.accounts = accounts
        save()
    },
    loadAccounts: () => {
        load()
        return data.accounts
    },
    saveLaunchers: (launchers) => {
        data.launchers = launchers
        save()
    },
    loadLaunchers: () => {
        load()
        return data.launchers
    },
}
