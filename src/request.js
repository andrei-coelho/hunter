const 
    config = require("./config"),
    fetch  = require('node-fetch'),
    helper = require('./helpers/helper'),
    log    = require('./helpers/log');


const request = 
    (uri, data, callback, conf) => 
        fetch(conf.api_url + uri, data)
            .then(res => res.json())
            .then(json => callback(json))
            .catch(error => log.out(error));

const _text = 
    (uri, data, callback, conf) =>
        fetch(conf.api_url + uri, data)
            .then(res => res.text())
            .then(text => callback(text))
            .catch(error => log.out(error));
        


const init = (uri, method, callback, vars, text = false) => {
    config().then(conf => {

        var data = {}
        vars['HUNTER-CHAVE-MACHINE'] = conf.machine
        data.method = method;
        data.body = JSON.stringify(vars);
        text ? _text(uri, data, callback, conf) : request(uri, data, callback, conf);

    }).catch(error => log.out(error))
    
}


module.exports = {

    req : (uri, callback, vars = {}) => {
        init(uri, 'post', callback, vars)
    },

    req_text : (uri, vars, callback) => {
        init(uri, 'post', callback, vars, true)
    }

}

