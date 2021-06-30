const 
    config = require("./config"),
    fetch  = require('node-fetch'),
    log    = require('./helpers/log');

const request = 
    (uri, data, conf) => 
        fetch(conf.api_url + uri, data)
            .then(res => res.json())
            .then(json => json)
            .catch(error => log.out(error));

const _text = 
    (uri, data, conf) =>
        fetch(conf.api_url + uri, data)
            .then(res => res.text())
            .then(text => text)
            .catch(error => log.out(error));

const init = (uri, method, vars, text = false) => {
    return config().then(conf => {
        var data = {}
        vars['HUNTER-CHAVE-MACHINE'] = conf.machine
        data.method = method;
        data.body = JSON.stringify(vars);
        return text ? _text(uri, data, conf) : request(uri, data, conf);
    }).catch(error => log.out(error))
}

module.exports = async (uri, vars = {}, text = false) => {
    return init(uri, 'post', vars, text)
}
