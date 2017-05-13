console.log('postDataToMongoDB.js called')

// post data to MongoDB

const request = require('request')

let parseMediaType = (data) => {
  return data
}

let parseDateCreated = (data) => {
  return data
}

module.exports.postData = (data) => {

  let dataToPost = {
    dateCreated: parseDateCreated(data),
    mediaType: parseMediaType(data),
    url: data.location
  }

  console.log('dataToPost', dataToPost)
}
