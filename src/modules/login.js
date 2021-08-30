const log = require('../helpers/log');

module.exports = async accounts => {
    
    await Object.keys(accounts).forEach( async socialMedia => {

        await accounts[socialMedia].forEach( async account => {
             
            let script = require('../driver/'+socialMedia+'/'+socialMedia);
            account.logged = await script.checkLogin(account.driver);

            if (!account.logged){

                await script.login(account.driver);
                account.logged = await script.checkLogin(account.driver);
                
                if(!account.logged){
                    log.out("Erro ao tentar logar! conta: "+account.email+" | rede social: "+socialMedia);
                    throw "err";
                }
                
            }
        
        })

    })

}
