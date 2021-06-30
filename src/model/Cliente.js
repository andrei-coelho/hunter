const request = require('../request'),
      AccountClient = require('../model/AccountCliente');

const Cliente = function(json){

    this.nome = json.nome;
    this.slug = json.slug;

    this.accounts = {
        twitter:[],
        instagram:[]
    }
    this.profilesToFollow = [];
   
}

Cliente.prototype.setAccounts = function(accounts){
    accounts.forEach(el => this.accounts[el.redeSocial].push(new AccountClient(el)));
}

Cliente.prototype.setProfiles = function(profiles){
    // criar os profiles
}

module.exports = Cliente;