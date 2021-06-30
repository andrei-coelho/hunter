"use strict";

const 

    log           = require('./helpers/log'),
    count_args    = process.argv.length,
    args          = process.argv;

var command, client = false;

module.exports = _=> {
    
    if(count_args < 3) error();

    count_args == 4 ? (function(){
           command  = args[2];
           file     = args[3];
    })() : command  = args[2];

    switch (command) {
        
        case "-help": help(); break;
        case "-start": start(); break;
        case "-test": test(); break;
            
        default: error(4);break;

    }
    
}

const start = _ => (require('./modules/controller'))()

const test = _ => {
    var file = args[3];
    if(count_args == 5){
        getClientExecute(args[4], (e, clients) => {
            if (e) throw e;
            (require('../test/'+file))(conf, clients);
        });
        return;
    }
    (require('../test/'+file))(conf);
}

const error = (type = 1) => {
    let msg = "";
    switch (type) {
        case 1:
            msg = "Erro ao iniciar o processo. O quantidade de argumentos não é válida para este comando.";
            break;
        case 2:
            msg = "O módulo não foi especificado corretamente.";
            break;
        case 3:
            msg = "O módulo especificado não existe.";
            break;
        case 4:
            msg = "O comando especificado não existe.";
            break;
    }
    log.out(msg, "danger", false);
    help();
}


const help = ()=> {
    log.out(`
    *                                                 *
    *   __                     __                     *
    *  /\\ \\                   /\\ \\__                  *
    *  \\ \\ \\___   __  __   ___\\ \\ '_\\    __   _ __    *
    *   \\ \\ \` _\`\\/\\ \\/\\ \\/ \`__\`\\ \\ \\/  / \`+\`\\/\\\`'__\\  *
    *    \\ \\ \\ \\ \\ \\ \\_\\  \\ \\ \\ \\ \\ \\_/\\  __/\\ \\ \\/   *
    *     \\ \\_\\ \\_\\   __'/ \\ \\ \\_\\ \\__\\ \\____\\\\ \\_\\   *
    *      \\/_/\\/_/\\/___/ \\/_/\\/_/\\/__/\\/____/ \\/_/   *
    *                       2.0.0                     *
    *                                                 *
    USO:`, "warning", false)
    log.out(`
    $ node hunter [command]
    `, "info", false)
    log.out(`[command]`, "warning", false)
    log.out(`
    -help                 - "mostra as opções de comando"
    -start                - "executa todos os clientes ativos e suas redes 
                             sociais seguindo as configurações de cada um"
    -test [file]          - "executa um arquivo de teste em ./test/"
    `, "info", false)
    log.out(`[modules]`, "warning", false)
    log.out(`
    seguidores            - "controla os seguidores e segue outros perfis"
    login                 - "faz o login do cliente no fb e salva os cookies"
    busca                 - "faz a busca de perfis conforme config do cliente"
    analise               - "analisa o engajamento das publicações"
    mensagem              - "envia mensagens geradas pela API"
    `, "info", false);
    log.out(`[socialmedia]`, "warning", false)
    log.out(`
    twitter            
    instagram          
    `, "info", false);
    log.out(`[client]`, "warning", false)
    log.out(`
    "slug que representa um cliente cadastrado"
    `, "info", false)
    log.out(`[file]`, "warning", false)
    log.out(`
    "nome do arquivo de teste em js salvo em ./test/"
    `, "info", false)
    process.exit()
}

const under_construction = () => {
    log.out(
    `
*   __                     __                     *
*  /\\ \\                   /\\ \\__                  *
*  \\ \\ \\___   __  __   ___\\ \\ '_\\    __   _ __    *
*   \\ \\ \` _\`\\/\\ \\/\\ \\/ \`__\`\\ \\ \\/  / \`+\`\\/\\\`'__\\  *
*    \\ \\ \\ \\ \\ \\ \\_\\  \\ \\ \\ \\ \\ \\_/\\  __/\\ \\ \\/   *
*     \\ \\_\\ \\_\\   __'/ \\ \\ \\_\\ \\__\\ \\____\\\\ \\_\\   *
*      \\/_/\\/_/\\/___/ \\/_/\\/_/\\/__/\\/____/ \\/_/   *
*                       2.0.0                     *
*              **** em construção ****            *
`, 
    "warning", false )
}