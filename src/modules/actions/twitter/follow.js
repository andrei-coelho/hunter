const request = require('../../../request'),
      helper  = require('../../../helpers/helper'),
      { By }  = require('selenium-webdriver');

const urlRedeSocial = "https://www.twitter.com/";

module.exports = async (perfilASeguir, conta, clientSlug) => {

    const driver = conta.driver;

    await driver.get(urlRedeSocial+perfilASeguir.slug);
    await helper.sleep(2000);

    let elementPresent = false;
    let status = true;
    let count = 1;

    while(!elementPresent){
        try {
            await driver.findElement(By.xpath("//*[@data-testid='placementTracking']"));
            await driver.findElement(By.xpath("//*[@href='/"+perfilASeguir.slug+"/followers']"));
            elementPresent = true;
        } catch(e){
            await helper.sleep(1000);
            count++;
        }
        if(count == 5){
            elementPresent = true;
            status = false;
        } 
    }

    let texto = await driver.findElement(By.xpath("//*[@href='/"+perfilASeguir.slug+"/followers']")).getText();
    if(parseInt(texto.split(" ")[0].replace(/\./gi, "")) < 20){
        // let resp = await request("")
        return {follow:false, save:false};
    }
 

    if(status){
        try {

            await driver
            .findElement(By.xpath("//*[@data-testid='placementTracking']"))
            .findElement(By.css('div'))
            .findElement(By.css('div'))
            .click()

        } catch(e){
            console.log("Não foi possível clicar no objeto");
            return {follow:false, save:false};
        }
        
    }

   
    let resp = await request("actionsService/follow",{
        clientSlug:clientSlug,
        account_id:conta.conta_id,
        profileSlug: perfilASeguir.slug
    })

    console.log(resp);
    
    return {follow:true, save:resp.code == 200} ;
    
}