//Serial Variables
let serial;          // variable to hold an instance of the serialport library
let portName = '/dev/cu.usbmodem1411';  // fill in your serial port name here
let inData;
let filterData;
//Graphics Variables
let snowflakes = [];
snowflakes.length = 150;
let maxR = 40;

function setup() {
  //Graphics Setup
  createCanvas(1000, 300);
  for(let i=0; i<snowflakes.length; i++){
    snowflakes[i] = new Snowflake(random(width), -maxR, random(0, maxR), random(10,12), random(2, 10), random(.1,2));
  }
  
  //Serial Setup
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);  // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
 
  serial.list();                      // list the serial ports
  serial.open(portName);              // open a serial port
}
 

function draw() {
  filterData = map(inData, 0, 255, 200,230);
  background(164, 187, 193);
  for(j=0; j<snowflakes.length; j++){
    snowflakes[j].display();
    snowflakes[j].move();
  }
  
  
  
}


// Functions to respond to setup callbacks

function serialEvent() {
  inData = serial.read();
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

// Defining the Snowflake Class
class Snowflake {
  constructor(x, y, r, branchStart, branchEnd, speed) {
    this.x = x; // initial x position
    this.y = y; // initial y position
    this.r = r; // radius of snowfake
    this.branchStart = branchStart; // start of branch line
    this.branchEnd = branchEnd; // end of branch line
    this.speed = speed;
  }

  display() {
    push();
    translate(this.x, this.y);
    for (let ang = 0; ang <= 2 * PI; ang = ang + PI / 4) {
      rectMode(CENTER);
      noStroke();
      fill(random(filterData, 255));
      rect(0, 0, this.r, 2);
      stroke(random(filterData, 255));
      strokeWeight(2)
      line(this.branchStart, 0, this.r / 2, this.branchEnd)
      line(this.branchStart, 0, this.r / 2, -this.branchEnd)
      rotate(ang)
    }
    pop();
  }

  move() {
    if(this.y < height+maxR) {
      this.y = this.y + this.speed;
    }else{
      this.y = -maxR;
    }  
  }
  
}

