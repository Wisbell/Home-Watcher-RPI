let { takePicture } = require('./modules/takePicture')
let { readPictureFile } = require('./modules/readPictureFile')
let { sendPictureToAWS, checkStorageAmount } = require('./modules/awsS3')
let { postData } = require('./modules/postDataToMongoDB')
let { deletePictureFile } = require('./modules/removePictureFile.js')

// Set flag variable to prevent overloading the Raspberry Pi
let processingImage = false;

module.exports.startPictureProcess = () => {

  // Check to see if an image is currently being processed
  if (!processingImage) {

    processingImage = true
    let currentImageFile

    //Begin Promise Chain

    takePicture()
      // Read picture file
      .then( (filePath) => {
        currentImageFile = filePath
        return readPictureFile(filePath)
      })
      // Send picture to AWS S3
      .then( (dataObject) => {
        return sendPictureToAWS(dataObject)
      })
      // Send returned URL and data to MongoDB
      .then( (data) => {
        return postData(data)
      })
      // Delete picture file on RPI -- Switch readFile to readStream to avoid this step?
      .then( () => {
        return deletePictureFile(currentImageFile)
      })
      // reset processingImage flag variable
      .then( () => {
        processingImage = checkStorageAmount()
      })

  } // Closes if statement for proccessing image
}
