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

    count = 0;
    elementPresent = false;

    while(!elementPresent){

        try {

            await driver.findElement(By.xpath("//*[@href='/"+perfilASeguir.slug+"/followers']"));
            let texto = await driver.findElement(By.xpath("//*[@href='/"+perfilASeguir.slug+"/followers']")).getText();
            
            if(parseInt(texto.split(" ")[0].replace(/\./gi, "")) < 5){
                
                let resp = await request("actionsService/notFollowNow",{
                    clientSlug:clientSlug,
                    account_id:conta.conta_id,
                    profileSlug: perfilASeguir.slug
                })

                return {follow:false, save:resp.code == 200};
            }

            elementPresent = true;

        } catch(e){
            await helper.sleep(1000);
            count++;
        }
        if(count == 5){
            elementPresent = true;
        } 
        
    }

    // curtir publicações...

    count = 0;
    curtiu = 0;
    curtir = Math.round(Math.random() * (2 - 1) + 1); // curtir no máximo 2 publicações

    // console.log(curtir);// apagar

    while(true){
        try {
            if(count == 5 || curtiu >= curtir) break;
            await driver.findElement(By.xpath("//*[@data-testid='like']")).click();
            curtiu++;
            await helper.sleep(1000);
        } catch (error) {
            await helper.sleep(1000);
            count++;
        }
    }

    // seguir...
    
    if(status){
        try {

            await driver
            .findElement(By.xpath("//*[@data-testid='placementTracking']"))
            .findElement(By.css('div'))
            .findElement(By.css('div'))
            .click()

        } catch(e){
            return {follow:false, save: false};
        }
        
    }

    let resp = await request("actionsService/follow",{
        clientSlug:clientSlug,
        account_id:conta.conta_id,
        profileSlug: perfilASeguir.slug
    })

    console.log("seguiu: "+perfilASeguir.slug);
    
    return {follow:true, save: (resp.code == 200)} ;
    
}