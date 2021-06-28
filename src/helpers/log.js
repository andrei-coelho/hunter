"use strict";

var datetime  = require("./datetime"),
    fs        = require('fs');

const danger  = '\x1b[31m',
      warning = '\x1b[33m',
      info    = '\x1b[36m%s\x1b[0m';

module.exports.out = (message, type = "info", time = true) => {

    if(time) message = datetime.time() + " = " + message;
    console.log(get_type(type), message);

}

module.exports.save = (message, type = "info", time = true, show = true) => {

    var file = appRoot+"/logs/"+datetime.date_underscore()+".txt";
    var mess = "\r"+datetime.time() + " > " + type + " = " + message;
    
    fs.open(file, 'r', err => {
        if(err){
            fs.writeFile(file, mess, err => {
                if(err) throw err;
            })
        } else {
            fs.appendFile(file, mess, err => {
                if (err) throw err;
            })
        }
    })

    if(show) this.out(message, type, time);

}

const get_type = type => {
     switch (type) {
        case 'danger': return danger;
        case 'warning': return warning;
        case 'info': default: return info;
    }
}