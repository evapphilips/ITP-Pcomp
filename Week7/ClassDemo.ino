#include <Servo.h>

Servo myservo;
int angle = 0;

void setup() {
  Serial.begin(9600);
  myservo.attach(3);
}

void loop() {
  if(Serial.available()>0){
    int reading = Serial.parseInt();
    if(reading){
    angle = reading;
  }
  myservo.write(angle);

}
}
