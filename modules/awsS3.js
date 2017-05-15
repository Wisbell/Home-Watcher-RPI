const AWS = require("aws-sdk")
const { deleteData } = require('./postDataToMongoDB.js')

// Update AWS configuration
AWS.config.update({
  accessKeyId:     process.env.S3_KEY,
  secretAccessKey: process.env.S3_SECRET,
  region:          process.env.S3_REGION
});

let s3 = new AWS.S3()

let myBucket = 'home-watcher';
let maxNumberPictures = 10;

let listObjects = () => {
  return new Promise( (resolve, reject) => {

    s3.listObjects({Bucket: myBucket}, function(err, data) {
      if(err) console.log(err, err.stack);
      else    resolve(data.Contents);
    })
  })
}

let deletePictureAWS = (key) => {
  console.log('deletePictureAWS Key', key)
  console.log('Deleting picture from AWS S3')

  params = {
    Bucket: myBucket,
    Key: key
  }

  s3.deleteObject(params, (err, data) => {
    if (err) console.log(err, err.stack);
    else {
      console.log("picture deleted!", data)
      deleteData(key)
    }
  })
}

module.exports.sendPictureToAWS = ( {dataBuffer, filePath} ) => {
  console.log('filePath in AWS', filePath)
  console.log('dataBuffer in AWS', dataBuffer)

  return new Promise( (resolve, reject) => {

    s3.createBucket({Bucket: myBucket}, function(err) {
      console.log('in createBucket')
      if (err) {
         console.log(err);
      } else {
        console.log('in Else')
        params = {Bucket: myBucket, ACL: "public-read", Key: filePath, Body: dataBuffer, ContentType: "image/jpeg"}

        s3.upload(params, function(err, data){
          if (err) {
            console.log(err)
          } else {
            console.log(`Successfully uploaded data to ${myBucket}/${filePath}`);
            console.log("data", data)
            resolve(data)
          }
        })
      }
    })
  })
}

module.exports.checkStorageAmount = () => {
  listObjects()
    .then((objectsArray) => {
      console.log("objectsArray", objectsArray)
      console.log("objectsArray length", objectsArray.length)

      if(objectsArray.length > maxNumberPictures) {
        console.log('lets delete a picture')
        console.log('delete object key', objectsArray[0].Key)
        deletePictureAWS(objectsArray[0].Key)
        // deleteData(objectsArray[0].Key)
      }
      return false
    })
}
