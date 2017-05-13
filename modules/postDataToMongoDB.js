console.log('postDataToMongoDB.js called')

// post data to MongoDB

const request = require('request')

let parseMediaType = (data) => {
  return data.key.split('.')[1]
}

let parseDateCreated = (data) => {
  return data.key.split('/')[1]
                 .split('.')[0]
                 .split('_')
                 .join(' ')
                 .replace(':', '')
}

module.exports.postData = (data) => {

  let dataToPost = {
    dateCreated: parseDateCreated(data),
    mediaType: parseMediaType(data),
    url: data.location
  }

  console.log('dataToPost', dataToPost)
}
