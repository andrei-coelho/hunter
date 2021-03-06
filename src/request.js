const 
    config = require("./config"),
    fetch  = require('node-fetch'),
    helper = require('../helpers/helper');


const request = 
    (uri, data, callback, conf) => 
        fetch(conf.api_url + uri, data)
            .then(res => res.json())
            .then(json => callback(json))
            .catch(error => console.log(error));

const _text = 
    (uri, data, callback, conf) => 
        fetch(conf.api_url + uri, data)
            .then(res => res.text())
            .then(text => callback(text))
            .catch(error => console.log(error));


const init = (uri, method, callback, vars, text = false) => {
    
    config().then(conf => {
    
        var data = {}

        if(!helper.isEmpty(vars))
            data.body = JSON.stringify(vars);
        
        data.method = method;
        data.headers = {
            'HUNTER-CHAVE-MACHINE': conf.machine
        }

        text ? _text(uri, data, callback, conf) : request(uri, data, callback, conf);

    }).catch(error => console.log(error))
    
}


module.exports = {

    get : (uri, callback) => {
        init(uri, 'get', callback, {})
    },

    post : (uri, vars, callback) => {
        init(uri, 'post', callback, vars)
    },

    get_text : (uri, callback) => {
        init(uri, 'get', callback, {}, true)
    },

    post_text : (uri, vars, callback) => {
        init(uri, 'post', callback, vars, true)
    }

}

