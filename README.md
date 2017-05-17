# Home-Watcher-RPI
Code for Raspberry Pi functionality for back-end capstone

![Alt text](/my_rpi2.jpg?raw=true "Optional Title")

## Information

The hardware aspect of the project consists of the RPI, camera module, motion sensor module, and a battery pack.  The Johnny Five and Rasp-io NPM modules give the the app a way to interface with a RPI using javascript.
The app itself consists of a camera module being triggered when motion is sensed.  The saved picture is then sent to Amazon's storage service, S3.  With a URL of the picture returned from S3, a post request is made to a MongoDB to store the URL and the date the picture was taken.  Now a client can use the front-end part of the project to see the most recent pictures.

To see other parts of this project [click here](https://github.com/Wisbell/Home-Watcher)

## Technologies

AWS S3 (Amazon Web Services: Simple Storage Solutions),
Johnny Five,
Rasp-io,
NodeJS
