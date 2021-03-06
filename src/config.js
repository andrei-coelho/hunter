const 
    config = {},
    helper = require("../helpers/helper"),
    fs     = require('fs');

function loader(){

    return new Promise(res => {

        if(helper.isEmpty(config))
            
            fs.readFile("./storage/conf.json", (e, data) => {

                if(e) throw "O aquivo 'conf.json' não existe";

                var conf = JSON.parse(data);
                config.api_url = conf.production ? conf.api_url_prod : conf.api_url_dev;
                config.machine = conf.machine_key;
                
                res(config);

            });

        else res(config);

    })
}

module.exports = async _ => await loader();