let serial;          // variable to hold an instance of the serialport library
let portName = '/dev/cu.usbmodem1411';  // fill in your serial port name here
 
let output;

function setup() {
  
  //Serial Steup
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);  // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
 
  serial.list();                      // list the serial ports
  serial.open(portName);              // open a serial port
  
  //Sketch Setup
  createCanvas(400, 400);
}
 

function draw() {
  background(220);
  output = int(map(mouseX, 0, width, 255, 0));
  output = constrain(output, 0, 179);
  textSize(14);
  text("My output is: " + output, 10, 80);
  let l = ellipse(mouseX, mouseY, 50, 50);
  
}

function mouseDragged(){
  serial.write(output + "\n")
  
}


// Functions to respond to setup callbacks

function serialEvent() {
 
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
