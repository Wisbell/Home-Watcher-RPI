const request = require('request')

// let databasePostUrl = 'http://192.168.100.4:8080/api/v1/media/new'
let databasePostUrl = 'https://home-watcher.herokuapp.com/api/v1/media/new'
// let databaseDeleteUrl = 'http://192.168.100.4:8080/api/v1/media/deleteMedia/'
let databaseDeleteUrl = 'https://home-watcher.herokuapp.com/api/v1/media/deleteMedia/'

let parseMediaType = (data) => {
  console.log('parseMediaType called')
  return data.key.split(".")[1]
}

let parseDateCreated = (data) => {
  console.log('parseDateCreated called')
  return data.key.split("/")[1]
                 .split(".")[0]
                 .split("_")
                 .join(" ")
                 .replace(/:/g, "")
}

let parseFileName = (data) => {
  console.log('parseFileName called')
  return data.split('images/')[1].replace(/%3A/g, ':')

}

module.exports.postData = (data) => {
  return new Promise((resolve, reject) => {
    console.log('MongoDB postData function called')
    let dataToPost = JSON.stringify({
      "dateCreated": parseDateCreated(data),
      "mediaType": parseMediaType(data),
      "url": data.Location,
      "awsFileName": parseFileName(data.key)
    })

    console.log('dataToPost', dataToPost)

    let options = {
      method: "POST",
      url: databasePostUrl,
      headers: {
        "content-type": "application/json",
        },
      body: dataToPost,
    }

    request(options, (err, res, body) => {
      if (err) {console.log('err', err)};
      console.log("Response status: ", res.statusCode)
      resolve()
    })
  })
}

module.exports.deleteData = (key) => {
  return new Promise((resolve, reject) => {
    console.log('key to delete from Mongo', key)

    let mongoFileProperty = parseFileName(key)
    console.log('mongoFileProperty', mongoFileProperty)

    console.log('delete url', databaseDeleteUrl + key)
    request.del(databaseDeleteUrl + mongoFileProperty, () => {
      console.log('Collection deleted from MongoDB - RPI')
    })
    // console.log('dataToDelete', dataToPost)

    // let options = {
    //   method: "POST",
    //   url: databasePostUrl,
    //   headers: {
    //     "content-type": "application/json",
    //     },
    //   body: dataToPost,
    // }

    // request(options, (err, res, body) => {
    //   if (err) {console.log('err', err)};
    //   console.log("Response status: ", res.statusCode)
    //   resolve()
    // })
  })
}
