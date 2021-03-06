"use strict";

module.exports = {

    full : function(){
        var data = new Date(),
            dia  = data.getDate().toString(),
            diaF = (dia.length == 1) ? '0'+dia : dia,
            mes  = (data.getMonth()+1).toString(),
            mesF = (mes.length == 1) ? '0'+mes : mes,
            anoF = data.getFullYear(),
            time = `${("0" + data.getHours()).slice(-2)}:${("0" + data.getMinutes()).slice(-2)}h`;
        return diaF+"/"+mesF+"/"+anoF+" às "+time;
    },

    date : function(){
        var data = new Date(),
            dia  = data.getDate().toString(),
            diaF = (dia.length == 1) ? '0'+dia : dia,
            mes  = (data.getMonth()+1).toString(),
            mesF = (mes.length == 1) ? '0'+mes : mes,
            anoF = data.getFullYear()
        return diaF+"/"+mesF+"/"+anoF;
    },

    date_underscore : function(){
        var data = new Date(),
            dia  = data.getDate().toString(),
            diaF = (dia.length == 1) ? '0'+dia : dia,
            mes  = (data.getMonth()+1).toString(),
            mesF = (mes.length == 1) ? '0'+mes : mes,
            anoF = data.getFullYear()
        return diaF+"_"+mesF+"_"+anoF;
    },

    time : function(){
        let data = new Date();
        let time = `${("0" + data.getHours()).slice(-2)}:${("0" + data.getMinutes()).slice(-2)}`;
        return time;
    }
    
}