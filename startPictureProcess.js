let { takePicture } = require('./modules/takePicture')
let { readPictureFile } = require('./modules/readPictureFile')
let { sendPictureToAWS } = require('./modules/awsS3')
let { postData } = require('./modules/postDataToMongoDB')


// Set flag variable to prevent overloading the Raspberry Pi
let processingImage = false;

module.exports.startPictureProcess = () => {

  let currentPictureFileName

  // Check to see if an image is currently being processed
  if (!processingImage) {

    processingImage = true

    //Begin Promise Chain

    // Note - maybe set picture timeout to something other than default - default is 5 seconds
    takePicture()
      // Read picture file
      .then( (filePath) => {
        return readPictureFile(filePath)
      })
      // Send picture to AWS S3
      .then( (dataObject) => {
        return sendPictureToAWS(dataObject)
      })
      // Send returned URL to MongoDB
      .then( (data) => {
        //console.log("the data", data) // data.location

        postData(data)
      })
      // Delete picture file on RPI

      // Switch readFile to readStream to avoid this step?

      // reset processingImage flag variable


  } // Closes if statement for proccessing image
}
