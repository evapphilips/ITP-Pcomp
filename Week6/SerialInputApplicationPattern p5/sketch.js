// Serial Variables
let serial; // variable to hold an instance of the serialport library
let portName = '/dev/cu.usbmodem1411'; // fill in your serial port name here
let inData;
let values = [];
// Graphics Variables
let rmode;
let iter;
let ang;
let w;
let h;

function setup() {
  // Graphics Setup
  createCanvas(600, 600);
  w = width/4;
  h = height/4;
  
  // Serial Setup
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('list', printList); // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen); // callback for the port opening
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.on('close', portClose); // callback for the port closing

  serial.list(); // list the serial ports
  serial.open(portName); // open a serial port
}


function draw() {
  // convert incoming data to usable varaibles
  rmode = values[0];
  iter = values[1];
  iter = map(iter, 0, 255, 0, 200);
  ang = values[2]
  ang = map(ang, 0, 255, 1, 80)
  
  // set rectMode
  if(rmode){
    rectMode(CENTER);
  }else{
    rectMode(CORNER);
    
  }
  
  // draw rectangles
  background(0);
  noFill();
  stroke(255);
  for(let i=0; i<iter; i++){
  push();
  translate(width/2, height/2);
  rotate(i*PI/ang);
  rect(0, 0, w, h);
  pop();
  }
}


// Functions to respond to setup callbacks

function serialEvent() {
  inData = serial.readStringUntil("\r\n");
  if (inData) {
    values = int(split(inData, ","));
  }

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
