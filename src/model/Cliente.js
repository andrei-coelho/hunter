const request = require('../request'),
      AccountCliente = require('../model/AccountCliente'),
      ProfileCliente = require('../model/ProfileCliente');

const Cliente = function(json){

    this.nome = json.nome;
    this.slug = json.slug;

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
   
    this.mapActions = {}
}

Cliente.prototype.setAccounts = function(accounts){
    accounts.forEach(el => this.accounts[el.redeSocial].push(new AccountCliente(el)));
}

Cliente.prototype.setMapActions = function(map){
    
}

Cliente.prototype.setProfiles = function(profiles){
    // verificar se o perfil é para seguir (1) ou para analise (2)
    profiles.forEach( el => {
        if(el.status == 1)
            this.profilesToFollow[el.redeSocial].push(new ProfileCliente(el))
        if(el.status == 2)
            this.profilesToAnalysis[el.redeSocial].push({
                account: this.accounts[el.redeSocial].filter(obj => {
                    return obj.id === el.follow
                  })[0].email,
                profile:new ProfileCliente(el)
            })
    })

    console.log(this.profilesToAnalysis);
}

module.exports = Cliente;