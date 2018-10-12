// Eva Philips
// Pcomp Week 6, Serial Input to P5.js Lab

void setup() {
  Serial. begin(9600); // initialize serial communcations
}

void loop() {
  int potentiometer = analogRead(A0);  // read the input pin
  int mappedPot = map(potentiometer, 0, 1023, 0, 255); // map the potentiometer to fit in 1 byte (aka 0-255)
  Serial.write(mappedPot);  // print the mapped value to the serial port
  delay(1); // slight delay to stablize the ADC
  

}
