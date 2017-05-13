// Require environment variables
require("dotenv").config()

const Five = require("johnny-five")
const Raspi = require("raspi-io")

const { startProccess } = require('./startProcess')

let calibrated = false

// Set up interface for Raspberry Pi hardware
const board = new Five.Board({
  io: new Raspi()
});

// Once board created check to see if its ready
board.on("ready", function(){
  console.log("board ready")

  // Set up motion module to use port General Purpose Input/Output port 7 on the Raspberry Pi
  const motion = new Five.Motion('GPIO7')

  // Make sure motion sensor is properly calibrated
  motion.on("calibrated", function(){
    console.log("calibrated")
    calibrated = true
  })

  if (calibrated) {
    // Fire 'motionstart' event when
    motion.on("motionstart", function(){
      console.log("motion started")
      startProcess()
    })

    motion.on("motionend", function(){
      console.log("motion ended")
    })

    motion.on("change", function(){
      console.log("change fired")
    })
  }
})
