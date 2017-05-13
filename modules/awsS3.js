const AWS = require("aws-sdk")

// Update AWS configuration
AWS.config.update({
  accessKeyId:     process.env.S3_KEY,
  secretAccessKey: process.env.S3_SECRET,
  region:          process.env.S3_REGION
});

let s3 = new AWS.S3()

let myBucket = 'home-watcher';

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

module.exports.listObjects = () => {
  return new Promise( (resolve, reject) => {

    s3.listObjects({Bucket: myBucket}, function(err, data) {
      if(err) console.log(err, err.stack);
      else    resolve(console.log(data));

    })
  })
}
