const 
    helper = require("../../helpers/helper"),
    { By, Key, promise } = require('selenium-webdriver'),

    model = {

        name: "twitter",
        url:  "https://www.twitter.com/",

        limits:{},

        init: async _ => {
            // gera os limites atuais para que as ações diarias não ultrapassem 
        },
    
        login: async driver => {
    
            await helper.sleep(1500);

            await driver.get(model['url']+"login");
            await helper.sleep(1000);

            let elementPresent = false;
    
            while(!elementPresent){
               try {
                    await driver.findElement(By.name("text"));
                    elementPresent = true;
               } catch(e){
                    await helper.sleep(1000);
               }
            }

            await driver.findElement(By.name("text"))
                .sendKeys(driver.emailAccount, Key.ENTER);
            await helper.sleep(1000);

            elementPresent = false;

            while(!elementPresent){
                try {
                     await driver.findElement(By.name("password"));
                     elementPresent = true;
                } catch(e){
                     await helper.sleep(1000);
                }
             }

            await driver.findElement(By.name("password"))
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
        },

        build: async (account, cliente) => {
            const driver = account.driver;
            
            // pegar os seguidores dos profiles ancors para que as
            // contas fakes sigam

            const profilesAnc = cliente.ancorsProfiles;

            for (let i = 0; i < profilesAnc.length; i++) {
                const prof = profilesAnc[i];
                await driver.get(model['url']+prof.slug+"/followers")
                
                await helper.sleep(2000);
                const elements = await driver.findElements(By.xpath("//*[@data-testid='UserCell']"))
                
                var elementsList = [];

                await promise.map(elements, e => e.getText())
                .then(elems => {
                    elems.forEach(el => elementsList.push(el))
                });

                await helper.sleep(6000);

                console.log(elementsList);

                await driver.executeScript("window.scrollTo(0,1000);");
                await helper.sleep(1000);
            }

            //console.log(cliente);
        }
    
        
    };

module.exports = model;