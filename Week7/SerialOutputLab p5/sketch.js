let serial; // variable to hold an instance of the serialport library
let portName = '/dev/cu.usbmodem1411'; // fill in your serial port name here
var inData; // for incoming serial data
var outByte = 0; // for outgoing data

function setup() {
  //sketch setup
  createCanvas(400, 300); // make the canvas

  //serial setup
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.open(portName); // open a serial port
}


function draw() {
  // black background, white text:
  background(0);
  fill(255);
  // display the incoming serial data as a string:
  text("incoming value: " + inData, 30, 30);
}

// Function connected to draw
function mouseDragged() {
  // map the mouseY to a range from 0 to 255:
  outByte = int(map(mouseY, 0, height, 0, 255));
  // send it out the serial port:
  serial.write(outByte);
}

function keyPressed() {
 if (key ==='H' || key ==='L') { // if the user presses H or L
 serial.write(key);              // send it out the serial port
 }
}

// Functions to respond to setup callbacks

function serialEvent() {
  // read a byte from the serial port:
  var inByte = serial.read();
  // store it in a global variable:
  inData = inByte;
}

function printList(portList) {
  // portList is an array of serial port names
  for (let i = 0; i < portList.length; i++) {
    // Display the list the console:
    print(i + " " + portList[i]);
  }
}

function serverConnected() {
  print('connected to server.');
}

function portOpen() {
  print('the serial port opened.')
}

function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}

function portClose() {
  print('The serial port closed.');
}
