const 
    { Builder } = require('selenium-webdriver'),
    firefox     = require('selenium-webdriver/firefox'),
    config      = require("../../config"),
    fs          = require("fs");


const driver = async function(){

    let status = await config().production;
    var driver = await new Builder().forBrowser('firefox');
    
    //driver = driver.setFirefoxOptions(new firefox.Options().headless());

    if(status){
        driver = driver.setFirefoxOptions(new firefox.Options().headless());
    }

    driver = await driver.build();

    return driver;

}
    
const constr = async function(account){
    
    let redeSocialLib = require('./'+account.redeSocial);
   
    let driver = await driver();

    driver.redeSocial   = account.redeSocial;
    driver.emailAccount = account.email;
    driver.senhaAccount = account.senha;
    driver.cookiesDir   = global.appRoot+'\\storage\\cookies\\';
    driver.cookieDir    = driver.cookiesDir+driver.redeSocial+'\\';
    driver.cookieFile   = driver.cookieDir+driver.emailAccount+".json";
    
    driver.saveState = async function(){

        await setTimeout(async _ => {

            await driver.manage().getCookies().then( cookies => {
                
                Array.isArray(cookies) ?
                    cookies.forEach(el => {
                        el.sameSite = "Lax";
                    })
                : cookies.sameSite = "Lax";
                
                if (!fs.existsSync(driver.cookiesDir)) fs.mkdirSync(driver.cookiesDir);
                if (!fs.existsSync(driver.cookieDir)) fs.mkdirSync(driver.cookieDir);
                
                fs.writeFile(this.cookieFile, JSON.stringify(cookies), err => {
                    if (err) return console.log(err);
                    // console.log("Novos cookies salvos");
                });
                
            })
    
        }, 1000);
    }

    if(fs.existsSync(driver.cookieFile)) {
        await driver.get(redeSocialLib.url);
        let data = JSON.parse(fs.readFileSync(driver.cookieFile, 'utf8'));
        for (let i = 0; i < data.length; i++) {
            await driver.manage().addCookie( data[i]);
        }   
    }

    // await redeSocialLib.login(driver);
    await driver.saveState();

    return driver;

}



module.exports = {
    createByAccount: constr,
    driver: driver
};