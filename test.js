const request = require('./src/request')

request.post('examplePrivate/get/@empresa_teste', {ola:"mundo"}, obj => {
    console.log(obj);
})
