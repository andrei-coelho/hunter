
const AccountClient = function(json) {
    Object.keys(json).forEach(k => this[k] = json[k])
}

AccountClient.prototype.get = function(){

}

module.exports = AccountClient;