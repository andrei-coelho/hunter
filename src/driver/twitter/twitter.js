const fs = require("fs");

module.exports = {

    name: "twitter",
    url: "https://www.twitter.com/",

    login: async (driver) => {

        await setTimeout(async _ => {
    
            await driver.get(this.url+"login");

            await driver.manage().getCookies().then( cookies => {

                fs.writeFile(cookieFile, JSON.stringify(cookies), err => {
                    if (err) return console.log(err);
                });
        
                setTimeout(async _ => {
        
                    await driver.findElement(By.name("session[username_or_email]"))
                        .sendKeys(profileCliente.email);
                    await driver.findElement(By.name("session[password]"))
                        .sendKeys(profileCliente.senha, Key.ENTER);
                        
                }, 1000);
        
            });
        }, 1500);
    },

    warmup: _ => {
        
    },

    analysis: _ => {
        
    },

    actions: action => {
        
    }

}