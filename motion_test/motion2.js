var Gpio = require('onoff').Gpio

var pir = new Gpio(7, 'in', 'both')

pir.watch(function(err, value){
    if(err) exit()

    console.log('intrude detected');
    console.log(value)
})

function exit() {
    pir.unexport()
    process.exit()
}
