const fs = require("fs");
const { By } = require('selenium-webdriver');

module.exports = {

    name: "twitter",
    url: "https://www.twitter.com/",

    login: async (driver) => {

        console.log("logando...");

        await setTimeout(async _ => {
    
            await driver.get(this.url+"login");

            await setTimeout(async _ => {
        
                await driver.findElement(By.name("session[username_or_email]"))
                    .sendKeys(profileCliente.email);
                await driver.findElement(By.name("session[password]"))
                    .sendKeys(profileCliente.senha, Key.ENTER);

                await setTimeout(async _ => {
                    await driver.saveState();
                }, 1000);

            }, 1000);

        }, 1500);

        return await this.checkLogin(driver);

    },

    checkLogin: async driver =>{
        
        var status = true;
        
        await setTimeout(async () => {
            try {
                driver.findElement(By.id("layers")).getText();
            } catch (error) {
                status = false;
            }
        }, 1000);

        return status;
    },

    warmup: driver => {
        
    },

    analysis: driver => {
        
    },

    actions: (driver, action) => {
        
    }

}