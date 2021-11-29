
const helper = require("../helpers/helper");

module.exports = async cli => {

    console.log("Iniciando ação de seguir...");

    const contas = cli.accounts;
    const perfisASeguir = cli.profilesToFollow;
    const redes = Object.keys(contas);

    const seconds = 174; // quantidade de segundos de espera por conta

    // variaveis a serem apagadas
    const maxToFollow = 10; // maximo de seguidores para seguir em teste
    var seguidorAtual = 0;

    for (let i = 0; i < redes.length; i++) {
        
        const rede = redes[i];
        const contasRede  = contas[rede];
        const ac_seguir   = require('./actions/'+rede+'/follow');
        const totalContas = contasRede.length;

        if(totalContas == 0) continue;

        const perfisASeguirRedeSocial = perfisASeguir[rede];
        const maxId = totalContas-1;

        // quantidade de milisegundos de espera no loop para a proxima ação da próxima conta
        const secAw = (seconds - totalContas) * 1000; 
        var atualId = 0;

        for (let l = 0; l < perfisASeguirRedeSocial.length; l++) {

            if(atualId > maxId) atualId = 0;
            
            let perfilASeguir = perfisASeguirRedeSocial[l];
            let contaAtual = contasRede[atualId];
            
            
            let status = await ac_seguir(perfilASeguir, contaAtual, cli.slug);

            if(status.follow){
                await helper.sleep(secAw);
            }

            /* condicional de controle em tempo de teste */
            if(seguidorAtual == maxToFollow){
                break;
            }

            seguidorAtual++; // apagar tb!

            atualId++;
            
        }

    }

    // pegar as ações disponíveis das redes sociais do cliente com o limite diário disponível    
    // # Cliente.prototype.getActionsClient()

    // pegar as contas de cada rede social em um loop e realizar uma ação verificando se o limite da ação foi atingido
    // # Cliente.prototype.getAccounts()
}
