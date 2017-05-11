console.log("testing date")

// let d = new Date()

// var d = new Date(year, month, day, hours, minutes, seconds, milliseconds);
// var d = new Date();

// console.log("d", d)
// console.log("d", d.toString())


let createFileNameAsDate = () => {
      let date = new Date()
      return date.toString().split(" ").join("_")
    }

    let cameraArgument = ["/opt/vc/bin/raspistill", "-o", createFileNameAsDate()].join(" ")

    console.log(cameraArgument)
