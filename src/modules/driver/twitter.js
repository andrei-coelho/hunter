const 
    request = require("../../request"),
    helper = require("../../helpers/helper"),
    { By, Key, promise } = require('selenium-webdriver'),

    model = {

        name: "twitter",
        url:  "https://www.twitter.com/",

        limits:{},

        init: async _ => {
            // gera os limites atuais para que as ações diarias não ultrapassem 
        },

        action_follow: async _=>{},
    
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
            await helper.sleep(2000);
           
            try {
                await driver.findElement(By.xpath("//*[@data-testid='AppTabBar_Home_Link']"));
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
                var status = true;
                var elementsList = [];
                var scroll = 0;

                const limitObjects = 150;

                while(status){

                    scroll += 1000;

                    const elements = await driver.findElements(By.xpath("//*[@data-testid='UserCell']"))
                
                    await promise.map(elements, e => e.getText())
                    .then(elems => {

                        for (let i = 0; i < elems.length; i++) {

                            const el = elems[i];
                            let e   = el.split(/\r?\n/);
                            let obj = {
                                nome: e[0],
                                slug: e[1]
                            };

                            if(e[2] != "Seguindo" && !elementsList.some(item => item.slug === e[1])){
                                elementsList.push(obj)
                            }
                            
                        }
                
                    });

                    status = elementsList.length < limitObjects;

                    await helper.sleep(1000);
                    await driver.executeScript("window.scrollTo(0,"+scroll+");");
                    await helper.sleep(1000);

                }
                
                let res = await request("profilesService/saveNewProfiles", {
                    profiles: elementsList,
                    socialMedia: model['name'],
                    clientSlug: cliente.slug
                });

                if(res.code != 200){
                    console.log("Ocorreu um erro ao tentar estabelecer uma coneção com a API e os perfis não foram salvos");
                } else {
                    res.data.errors > 0 || res.data.repetidos > 0 ?
                    console.log("Nem todos os perfis foram salvos com sucesso"):
                    console.log("Todos os perfis foram salvos com sucesso");
                    
                    console.log("Sucesso: "+res.data.success);
                    console.log("Erros: "+res.data.errors);
                    console.log("Repetidos: "+res.data.repetidos);
                }

            }

        }
        
    };

module.exports = model;