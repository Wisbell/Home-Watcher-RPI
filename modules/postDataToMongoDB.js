const request = require('request')

let databasePostUrl = 'http://192.168.100.4:8080/api/v1/media/new'

let parseMediaType = (data) => {
  return data.key.split(".")[1]
}

let parseDateCreated = (data) => {
  return data.key.split("/")[1]
                 .split(".")[0]
                 .split("_")
                 .join(" ")
                 .replace(/:/g, "")
}

module.exports.postData = (data) => {
  return new Promise((resolve, reject) => {
    let dataToPost = JSON.stringify({
      "dateCreated": parseDateCreated(data),
      "mediaType": parseMediaType(data),
      "url": data.Location
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

  // let dataToPost = JSON.stringify({
  //   "dateCreated": parseDateCreated(data),
  //   "mediaType": parseMediaType(data),
  //   "url": data.Location
  // })

  // console.log('dataToPost', dataToPost)

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
  // })

}
