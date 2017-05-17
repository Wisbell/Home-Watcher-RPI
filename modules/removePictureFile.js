
const { unlink } = require('fs')

module.exports.deletePictureFile = (fileName) => {
  console.log("Deleting picture")

  return new Promise ((resolve, reject) => {
    unlink(fileName, (err) => {
      if (err) return console.log(err)
      console.log("Picture deleted successfully")
      resolve()
    })
  })
}
