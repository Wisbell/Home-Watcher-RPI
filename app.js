
// Require
// johnny-five, raspi-io, aws-sdk, child-process(exec),fs (filesystem), dotenv(config)

// Require environment variables
require("dotenv").config()

const { exec } = require("child_process")
const fs = require("fs")
const AWS = require("aws-sdk")
const Five = require("johnny-five")
const Raspi = require("raspi-io")

// Set flag variable to prevent overloading the Raspberry Pi
let processingImage = false;

// Update AWS configuration
AWS.config.update({
  accessKeyId:     process.env.S3_KEY,
  secretAccessKey: process.env.S3_SECRET,
  region:          process.env.S3_REGION
});

// Set up interface for Raspberry Pi hardware
const board = new Five.Board({
  io: new Raspi()
});

// Once board created check to see if its ready
board.on("ready", function(){
  console.log("board ready")

  // Set up motion module to use port General Purpose Input/Output port 7 on the Raspberry Pi
  const motion = new Five.Motion('GPIO7')

  // Make sure motion sensor is properly calibrated
  motion.on("calibrated", function(){
    console.log("calibrated")
  })

  // Fire 'motionstart' event when
  motion.on("motionstart", function(){
    console.log("motion started")

    // set execution parameters programatically

      // generate a new image name by date

      // Picture from camera can be manipulated using the -vf and/or -hf arguments

      // Set time out with -t argument, default is 5 seconds

      // Remove previewing of pictures on the RPI with the '-n' flag

    // Check to see if an image is currently being processed
    if (!processingImage) {

      processingImage = true

      // Create date for picture file name
      let createFileNameAsDate = () => {
        let date = new Date()
        //return date.toString().replace("(", ":").replace(")", ":").split(" ").join("_")
        return 'test_image'
      }

      // Create argument to pass to execute raspistill
      let cameraArgument = [ "/opt/vc/bin/raspistill", "-o", createFileNameAsDate() ].join(" ")

      let takePicture = () => {
        return new Promise( (resolve, reject) => {
          exec(cameraArgument, (err, stdout, stderr) => {
            if(err) {
              console.log("error", err)
              reject()
            }
            console.log("pic taken")
            resolve()
          })
        })
      }

      takePicture()
      .then( () => {
        console.log("What's next?")
        // read image and send it to AWS, duh
      })
    }

  })

  motion.on("motionend", function(){
    console.log("motion ended")
  })

  motion.on("change", function(){
    console.log("change fired")
  })
})
