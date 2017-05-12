// Require environment variables
require("dotenv").config()

// Necessary Modules
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

let s3 = new AWS.S3()

let myBucket = 'home-watcher';

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

    // Check to see if an image is currently being processed
    if (!processingImage) {

      processingImage = true

      // Create date for picture file name
      let createFileNameAsDate = () => {
        let date = new Date()
        return date.toString().replace("(", ":").replace(")", ":").split(" ").join("_") + ".jpg"
      }

      // Create argument to pass to execute raspistill
      let fileName = createFileNameAsDate()
      let createPath = "images/" + fileName
      let cameraArgument = [ "/opt/vc/bin/raspistill", "-o", createPath ].join(" ")

      let takePicture = () => {
        return new Promise( (resolve, reject) => {
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

      let readPictureFile = (filePath) => {
        return new Promise( (resolve, reject) => {
          fs.readFile(filePath, (err, dataBuffer) => {
            if(err) throw err;
            else {
              console.log('Done reading picture')
              resolve( { dataBuffer, filePath })
            }
          })
        })
      }

      let sendPictureToAWS = ( {dataBuffer, filePath} ) => {
        console.log('filePath in AWS', filePath)
        console.log('dataBuffer in AWS', dataBuffer)

        return new Promise( (resolve, reject) => {

          s3.createBucket({Bucket: myBucket}, function(err) {
            console.log('in createBucket')
            if (err) {
               console.log(err);
            } else {
              console.log('in Else')
              params = {Bucket: myBucket, ACL: "public-read", Key: filePath, Body: dataBuffer}

              s3.upload(params, function(err, data){
                if (err) {
                  console.log(err)
                } else {
                  console.log(`Successfully uploaded data to ${myBucket}/${filePath}`);
                  console.log("data", data)
                  // resolve(data)
                  resolve(true)
                }
              })
            }

          })
        })

      }

      //Begin Promise Chain
      takePicture()
        .then( (filePath) => {
          return readPictureFile(filePath)
        })
        .then( (dataObject) => {
          return sendPictureToAWS({dataBuffer, filePath})
        })


    } // Closes if statement for proccessing image

  })

  motion.on("motionend", function(){
    console.log("motion ended")
  })

  motion.on("change", function(){
    console.log("change fired")
  })
})
