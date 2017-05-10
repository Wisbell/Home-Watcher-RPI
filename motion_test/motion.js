var five = require("johnny-five");
var Raspi = require("raspi-io");

var spawn = require('child_process').spawn
var exec = require('child_process').exec

//let child = spawn('/opt/vc/bin/raspivid', ['-t', '0', '-w', '300', '-h', '300', '-hf', '-fps', '20', '-o', '-' ])
//let child = spawn('/opt/vc/bin/raspistill', ['-o', 'image.jpg'])
//let takePicture = exec('/opt/vc/bin/raspistill', ['-o', 'image.jpg'])

// this works horray!

var board = new five.Board({
        io: new Raspi()
    });

board.on("ready", function(){
        console.log("board ready")
        var motion = new five.Motion('GPIO7')

        motion.on("calibrated", function(){
                console.log("calibrated")
            })

        motion.on("motionstart", function(){
                console.log("motion started")

                exec('/opt/vc/bin/raspistill -o image.jpg', (err, stdout, stderr) => {
                    if(err) {
                        console.log("error", err)
                    }
                    console.log("pic taken")
                })

            })

        motion.on("motionend", function(){
                console.log("motion ended")
            })

        motion.on("change", function(){
                console.log("change fired")
            })
    })
