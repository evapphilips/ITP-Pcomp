#include <Servo.h>

//Servo Variables
int servoPin = 3;
Servo doorServo;
int inByte;
int wonGame;

void setup() {
  Serial.begin(9600);
  doorServo.attach(servoPin);

}

void loop() {
// Pot Code
int value1 = analogRead(A0);
Serial.print(value1);
Serial.print(",");
int value2 = analogRead(A1);
Serial.println(value2);


//Servo Code
  if(Serial.available()>0){     // if there's serial data available
    inByte = Serial.read(); // read it
    //Serial.println(inByte);        // send it back out as raw binary data 
    wonGame = inByte;
    Serial.println(wonGame);  
  }

  if(wonGame==49){
    delay(50);
    doorServo.write(80);
    delay(500);
    doorServo.write(30);
    delay(50);
    wonGame = 50;
  }
  

  

}
