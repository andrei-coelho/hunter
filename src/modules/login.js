const fs = require('fs');

module.exports = async accounts => {

    await Object.keys(accounts).forEach( async socialMedia => {

        await accounts[socialMedia].forEach( async account => {
            
            const path = global.appRoot+'/storage/cookies/'+socialMedia+'/'+account.email+".json";
            
            try {
                if (!fs.existsSync(path)){
                    // faz o login e gera o cookie 
                    
                }
                // verifica se a conta está ok
                if(checkLogin(path)){
                    console.log("ok");
                }

            } catch(err) {
                throw err;
            }
        
        })

    })

}


function checkLogin(file) {
    return true;
}