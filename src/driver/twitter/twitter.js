const fs     = require("fs"),
      helper = require("../../helpers/helper"),
      { By, Key } = require('selenium-webdriver');

const data = {
    name: "twitter",
    url: "https://www.twitter.com/"
};


module.exports = {

    name: data.name,
    url: data.url,

    login: async driver => {

        await helper.sleep(1500);
        await driver.get(data.url+"login");

        await helper.sleep(1000);
        await driver.findElement(By.name("session[username_or_email]"))
            .sendKeys(driver.emailAccount);
        await driver.findElement(By.name("session[password]"))
            .sendKeys(driver.senhaAccount, Key.ENTER);
        
        await helper.sleep(1000);
        await driver.saveState();

    },

    checkLogin: async driver =>{
        var status = true;
        await helper.sleep(1000);
        try {
            await driver.findElement(By.id("layers")).getText();
        } catch (error) {
            status = false;
        }
        return status;
    }

}