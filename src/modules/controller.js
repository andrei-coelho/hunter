const 
    request  = require('../request'),
    log      = require('../helpers/log'),
    Cliente  = require('../model/Cliente'),
    clientes = {list:[]};

module.exports = async _ => {
    
    let resClients = await request('clienteService/get/');
    clientes.length = resClients.data.length;

    if(!resClients || resClients.code != 200){
        if(!resClients) log.out("Erro ao tentar se conectar com a API", "danger")
        else log.out(`Erro: ${resClients.code} ### ${resClients.data.message}`)
    }
    
    for (let i = 0; i < resClients.data.length; i++) {
        
        let cl    = resClients.data[i],
            cli   = new Cliente(cl),
            resAc = await request('accountsService/get', {clientSlug:cli.slug}),
            resPs = await request('profilesService/get', {clientSlug:cli.slug});
            resAs = await request('actionsService/getMapActionsDay', {clientSlug:cli.slug});
        
        if(resAc.code != 200 || resPs.code != 200 || resAs.code != 200){
            log.out(`O servidor repondeu com um codigo diferente de 200 - Controller 25`, "danger");
        }
        
        cli.setAccounts(resAc.data);
        cli.setProfiles(resPs.data);
        cli.setMapActions(resPs.data);
        clientes.list.push(cli);

    }

    
}