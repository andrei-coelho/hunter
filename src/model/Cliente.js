const request = require('../request'),
      ProfileCliente = require('../model/ProfileCliente');

const Cliente = function(json, id_key){

    this.id_key = id_key;
    this.nome   = json.nome;
    this.slug   = json.slug;

    this.accounts = {
        twitter:[],
        instagram:[]
    }
    
    this.profilesToFollow = {
        twitter:[],
        instagram:[]
    }

    this.profilesToAnalysis = {
        twitter:[],
        instagram:[]
    }
   
    this.ancorsProfiles = []
    this.actionsClient  = []
}

Cliente.prototype.setAccounts = function(accounts){
    accounts.forEach(el => this.accounts[el.redeSocial].push(new AccountCliente(el)));
}

Cliente.prototype.getAccounts = function(){
    return this.accounts;
}

Cliente.prototype.getActionsClient = function(){
    return this.actionsClient;
}

Cliente.prototype.setActionsClient = function(actions){
    this.actionsClient = actions;
}

Cliente.prototype.addAccount = function(account){
    this.accounts[account.redeSocial].push(account)
}

Cliente.prototype.setAncorsProfiles = function (profiles){
    this.ancorsProfiles = profiles;
}

Cliente.prototype.setProfiles = function(profiles){
    // verificar se o perfil é para seguir (1) ou para analise (2)
    profiles.forEach( el => {
        if(el.status == 1)
            this.profilesToFollow[el.redeSocial].push(new ProfileCliente(el))
        if(el.status == 2)
            this.profilesToAnalysis[el.redeSocial].push({
                for: this.accounts[el.redeSocial].filter(obj => {
                    return obj.id === el.follow
                  })[0].email,
                profile:new ProfileCliente(el)
            })
    })
}

module.exports = Cliente;