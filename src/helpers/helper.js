module.exports = {

    isEmpty : obj => {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    },

    sleep: m => new Promise(r => setTimeout(r, m))

}