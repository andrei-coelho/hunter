
const AccountClient = function(json) {
    Object.keys(json).forEach(k => this[k] = json[k])
}

module.exports = AccountClient;