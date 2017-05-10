
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
  const motion = new five.Motion('GPIO7')

  // Make sure motion sensor is properly calibrated
  motion.on("calibrated", function(){
          console.log("calibrated")
      })

  // Fire 'motionstart' event when
  motion.on("motionstart", function(){
          console.log("motion started")

          // set execution parameters programatically

            // generate a new image name by date

          let cameraArgument = ["/opt/vc/bin/raspistill", ] // finish adding arguments
          // look up additional arguments

          // use new Date() as file name

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
