const { exec } = require("child_process")

// Create date for picture file name
let createFileNameAsDate = () => {
  let date = new Date()
  return date.toString().replace("(", ":").replace(")", ":").split(" ").join("_") + ".jpg"
}

module.exports.takePicture = () => {
  return new Promise( (resolve, reject) => {

    // Create argument to pass to execute raspistill
    let fileName = createFileNameAsDate()
    let createPath = "images/" + fileName
    let cameraArgument = [ "/opt/vc/bin/raspistill", "-vf -hf", "-n", "-q 10", "-t 1", "-o", createPath ].join(" ")

    exec(cameraArgument, (err, stdout, stderr) => {
      if(err) {
        console.log("error", err)
        reject(err)
      }
      console.log('Done taking picture')
      resolve(createPath)
    })
  })
}
