console.log('postDataToMongoDB.js called')

// post data to MongoDB

const request = require('request')

let databasePostUrl = 'http://192.168.100.4:8080/api/v1/media/new'

let parseMediaType = (data) => {
  return data.key.split('.')[1]
}

let parseDateCreated = (data) => {
  return data.key.split('/')[1]
                 .split('.')[0]
                 .split('_')
                 .join(' ')
                 .replace(/:/g, '')
}



module.exports.postData = (data) => {

  let dataToPost = JSON.stringify({
    "dateCreated": parseDateCreated(data),
    "mediaType": parseMediaType(data),
    "url": data.Location
  })

  console.log('dataToPost', dataToPost)

  let options = {
    method: 'POST',
    url: databasePostUrl,
    headers: {
        'content-type': 'application/json',
        },
    body: dataToPost,
  }

  request(options, (err, res, body) => {
        if (err) {console.log('err', err)};
        console.log(res.statusCode)
    })

}

/*
{"dateCreated":"Sat May 13 2017 132120 GMT-0400 EDT",
"mediaType":"jpg",
"url":"https://home-watcher.s3.amazonaws.com/images/Sat_May_13_2017_13%3A21%3A20_GMT-0400_%3AEDT%3A.jpg"}
post completed

 */
