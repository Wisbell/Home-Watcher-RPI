let { takePicture } = require('./modules/takePicture')
let { readPictureFile } = require('./modules/readPictureFile')
let { sendPictureToAWS, checkStorageAmount } = require('./modules/awsS3')
let { postData } = require('./modules/postDataToMongoDB')
let { deletePictureFile } = require('./modules/removePictureFile.js')

// Set flag variable to prevent overloading the Raspberry Pi
let processingImage = false;

module.exports.startPictureProcess = () => {

  let currentPictureFileName

  // Check to see if an image is currently being processed
  if (!processingImage) {

    processingImage = true
    let currentImageFile
    var currentImageFile2
    let count = 0
    var count2 = 0

    //Begin Promise Chain

    // Note - maybe set picture timeout to something other than default - default is 5 seconds
    takePicture()
      // Read picture file
      .then( (filePath) => {
        currentImageFile = filePath
        currentImageFile2 = filePath
        console.log("count", count)
        console.log("count num 2", count)
        count = count + 1
        count2 = count + 1

        console.log('currentImageFile', currentImageFile)
        console.log('currentImageFile num 2', currentImageFile)
        return readPictureFile(filePath)
      })
      // Send picture to AWS S3
      .then( (dataObject) => {
        return sendPictureToAWS(dataObject)
      })
      // Send returned URL to MongoDB
      .then( (data) => {
        return postData(data)
      })
      // Delete picture file on RPI -- Switch readFile to readStream to avoid this step?
      .then( () => {
        console.log("currentImageFile2", currentImageFile)
        return deletePictureFile(currentImageFile)
      })
      // reset processingImage flag variable
      .then( () => {
        // disable this if testing
        //processingImage = false
        console.log('listing objects')
        processingImage = checkStorageAmount()
      })

  } // Closes if statement for proccessing image
}
