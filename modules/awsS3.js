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
  return new Promise( (resolve, reject) => {
    console.log('Deleting picture from AWS S3')

    params = {
      Bucket: myBucket,
      Key: key
    }

    s3.deleteObject(params, (err, data) => {
      if (err) console.log(err, err.stack);
      else {
        console.log("Picture deleted!")
        resolve(deleteData(key))
      }
    })
  })
}

module.exports.sendPictureToAWS = ( {dataBuffer, filePath} ) => {
  console.log('FilePath in AWS', filePath)
  console.log('DataBuffer in AWS', dataBuffer)

  return new Promise( (resolve, reject) => {

    s3.createBucket({Bucket: myBucket}, function(err) {
      if (err) {
         console.log(err);
      } else {
        params = {Bucket: myBucket, ACL: "public-read", Key: filePath, Body: dataBuffer, ContentType: "image/jpeg"}

        s3.upload(params, function(err, data){
          if (err) {
            console.log(err)
          } else {
            console.log(`Successfully uploaded data to ${myBucket}/${filePath}`);
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
      console.log("Number of Pictures: ", objectsArray.length)

      if(objectsArray.length > maxNumberPictures) {
        console.log('Too many pictures, lets delete one')
        deletePictureAWS(objectsArray[0].Key)
      }
      return false
    })
}
