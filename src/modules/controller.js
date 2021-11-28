
const 
    request  = require('../request'),
    log      = require('../helpers/log'),
    Cliente  = require('../model/Cliente'),
    driverC  = require('./driver/driver'),
    AccountCliente = require('../model/AccountCliente'),

    // modulos
    login    = require('./login'),
    actions  = require('./actions'),
    
    clientes = {list:[]},

start_list_clients = async (slug = "") => {

    let resClients = await request('clienteService/get/'+(slug != "" ? slug+"/" : ""));
    clientes.length = resClients.data.length;

    if(!resClients || resClients.code != 200){
        if(!resClients) log.out("Erro ao tentar se conectar com a API", "danger")
        else log.out(`Erro: ${resClients.code} ### ${resClients.data.message}`)
    }

    for (let i = 0; i < resClients.data.length; i++) {
            
        let cl    = resClients.data[i],
            cli   = new Cliente(cl, i),
            resAc = await request('accountsService/get', {clientSlug:cli.slug}),
            resAs = await request('actionsService/getActionsClient', {clientSlug:cli.slug}),
            resPs = await request('profilesService/get', {clientSlug:cli.slug});
            resPa = await request('profilesService/getPerfisAncoras', {clientSlug:cli.slug});

        if(resAc.code != 200 || resAs.code != 200 || resPs.code != 200 || resPa.code != 200){
            log.out(`O servidor repondeu com um codigo diferente de 200 - Controller 25`, "danger");
            console.log(resAc, resPs, resAs, resPa);
            return;
        }
        
        for (let l = 0; l < resAc.data.length; l++) {
            let account = new AccountCliente(resAc.data[l]);
            let driver  = await driverC(account)
            account.setDriver(driver);
            cli.addAccount(account);
        }
        
        cli.setProfiles(resPs.data);
        cli.setAncorsProfiles(resPa.data);
        cli.setActionsClient(resAs.data);
        clientes.list.push(cli);

    }

};

module.exports =  {

    start: async function(){

        await start_list_clients();

        for (let i = 0; i < clientes.length; i++) {
            const cli = clientes.list[i];
            cli.getAccounts().twitter.forEach(ac => {
                // console.log(ac.actions_today);
            });
            
            await login(cli.getAccounts());
            actions(cli)
        }

    },

    action: async function(client, account, socialmedia, action){
        await start_list_clients(client);
        await login(cli.getAccounts());

        // console.log(clientes[0].accounts);
    },

    build: async function(client, account, socialmedia){
    
        await start_list_clients(client);
        const cli  = clientes.list[0];

        await login(cli.getAccounts());
        const accs = cli.accounts[socialmedia];

        var   acc;

        for (let i = 0; i < accs.length; i++) {
            acc = accs[i];
            if(acc.slug == account) break;
        }

        require('./driver/'+socialmedia).build(acc, cli)

        // require('.//'+socialmedia+'/build')(acc, cli)

        //console.log(cli, acc);

    },

    open: async function(client, account, socialmedia){
        
        let resClients = await request('accountsService/getAccount', {
            clientSlug:client, 
            accountSlug: account, 
            socialMediaSlug:socialmedia
        });

        if(resClients.code != 200){
            log.out(resClients.data.message, "danger");
        }

        acc         = resClients.data[0];
        let acct    = new AccountCliente(acc);
        let driver  = await driverC(acct)
        acct.setDriver(driver);
        let obj = {};
        obj[socialmedia] = [acct];

        await login(obj);

    }
    
}