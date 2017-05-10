require('dotenv').config()

let fs = require('fs')
let AWS = require('aws-sdk')

AWS.config.update({
  accessKeyId:     process.env.S3_KEY,
  secretAccessKey: process.env.S3_SECRET,
  region:          process.env.S3_REGION
});

// let readPicture = fs.createReadStream('test_image/gurunath.jpg')

// console.log('readPicture', readPicture)
// readPicture.on('open', () => {
//   console.log('start read stream')
// })

// readPicture.on('data', (chunk) => {
//   console.log('data sent', chunk)
// })

// Create S3 Client
// let s3 = new AWS.s3()

// find out if bucket exists, if not create it

// if it exists . . .

// let readPicturePromise = new Promise( (resolve, reject) => {
//   let readPicture = fs.readFile('test_image/gurunath.jpg', (err, data) => {
//     if(err) throw err;
//   })
// })


// var myBucket = 'home-watcher'
// var myKey = 'myBucketKey'

// s3.createBucket({ Bucket: myBucket }, (err, data) => {
//   if(err){
//     console.log(err)
//   } else {
//     params = {Bucket: myBucket, Key: myKey, Body: 'Hello!'}

//     s3.putObject(params, (err, data) => {
//       if(err){
//         console.log(err)
//       } else {
//         console.log('Successfully uploaded data to myBucket/myKey')
//       }
//     })
//   }

// })

// var AWS = require('aws-sdk');

var s3 = new AWS.S3();

// Bucket names must be unique across all S3 users

var myBucket = 'home-watcher';

var myKey = 'myBucketKey3';

// s3.createBucket({Bucket: myBucket}, function(err, data) {

// if (err) {

//    console.log(err);

//    } else {

//      params = {Bucket: myBucket, Key: myKey, Body: 'Hello!'};

//      s3.putObject(params, function(err, data) {

//          if (err) {

//              console.log(err)

//          } else {

//              console.log("Successfully uploaded data to myBucket/myKey");

//          }

//       });

//    }

// });




// let readPicturePromise = new Promise( (resolve, reject) => {
//   let readPicture = fs.readFile('test_image/gurunath.jpg', (err, data) => {
//     if(err) throw err;
//     else {
//       console.log('done')
//     }
//   })
// })
// .then


// use upload instead of putObject

let readPicturePromise = () => {
  return new Promise( (resolve, reject) => {
    fs.readFile('test_image/gurunath.jpg', (err, data) => {
      if(err) throw err;
      else {
        console.log('done')
        resolve(data)
      }
    })
  })
}

readPicturePromise()
.then( (data) => {
  console.log('stuff called')
  s3.createBucket({Bucket: myBucket}, function(err) {

  if (err) {

     console.log(err);

     } else {

       params = {Bucket: myBucket, Key: myKey, Body: data};

       s3.putObject(params, function(err, data) {

           if (err) {

               console.log(err)

           } else {

               console.log("Successfully uploaded data to myBucket/myKey");

           }

        });

     }

  });
})

// let picture = fs.readFile('test_image/gurunath.jpg', (err, data) => {
//   if (err) throw err;
//   console.log(data)
// })
