

// How will this work together?

// maybe do it all in one file then modularize it

// Prework - setup dependencies/acquire required modules

/*

    1 - motion sensor will be triggered

          - when motion is triggered . . .

    2 - take picture with camera

          - might have to turn image 180 degrees
          - may be able to pipe image straight to next part of program instead of saving
          - might have to set timeout before image is taken in order to get best picture
          - save image as current date/time in order to send this info to AWS/Mongo

          - when image has been taken and saved to rPi . . .

    3 - fs.readFile on newly created image

          - when this has been done, send it to AWS . . .
          - may

    4 - use node AWS sdk to send picture to S3 storage

          - may have to use upload instead of putObject in order to get a return url

    5 - send url, type of media, and date the picture was taken to mongoDB

          - just do a post with the required information to media/new
    https://gist.github.com/Wisbell/b1578a30e8a13ec9ab022cfad149a175
*/
