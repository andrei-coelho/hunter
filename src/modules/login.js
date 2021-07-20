const fs = require('fs');

module.exports = async accounts => {

    await Object.keys(accounts).forEach( async socialMedia => {

        await accounts[socialMedia].forEach( async account => {
            
            const path = global.appRoot+'/storage/cookies/'+socialMedia+'/'+account.email+".json";
            
            let script = require('../driver/'+socialMedia+'/'+socialMedia);
                
            if (!fs.existsSync(path)){
                await script.login(account.driver)
            }

            account.logged = await script.checkLogin(account.driver);
        
        })

    })

}
