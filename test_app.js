// Require environment variables
require("dotenv").config()

const Five = require("johnny-five")
const Raspi = require("raspi-io")

// let { takePicture } = require('./takePicture')
// let { readPictureFile } = require('./readPictureFile')
// let { sendPictureToAWS } = require('./awsS3')
let { startProccess } = require('./startProcess')

// Set flag variable to prevent overloading the Raspberry Pi
let processingImage = false;

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

    startProcess()

    // // Check to see if an image is currently being processed
    // if (!processingImage) {

    //   processingImage = true

    //   //Begin Promise Chain

    //   // Note - maybe set picture timeout to something other than default - default is 5 seconds
    //   takePicture()
    //     // Read picture file
    //     .then( (filePath) => {
    //       return readPictureFile(filePath)
    //     })
    //     // Send picture to AWS S3
    //     .then( (dataObject) => {
    //       return sendPictureToAWS(dataObject)
    //     })
    //     // Send returned URL to MongoDB
    //     .then( (data) => {
    //       console.log("the data", data)
    //     })
    //     // Delete picture file on RPI

    //     // Switch readFile to readStream to avoid this step?

    //     // reset processingImage flag variable


    // } // Closes if statement for proccessing image

  })

  motion.on("motionend", function(){
    console.log("motion ended")
  })

  motion.on("change", function(){
    console.log("change fired")
  })
})
