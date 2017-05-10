
var exec = require('child_process').exec

exec('/opt/vc/bin/raspistill -o image.jpg', (err, stdout, stderr) => {
    if(err) {
        console.log("error", err)
    }
    console.log("pic taken")
})

