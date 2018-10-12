// Eva Philips
// Pcomp Week 6, Serial Input to P5.js Application: Pattern

void setup() {
  Serial.begin(9600);

}

void loop() {
  // read rectmode button
  int button = analogRead(A0);
  if(button == 1023){
    button = 1;
  }

  // read i potentiometer
  int potentiometer1 = analogRead(A1);
  int pot1 = map(potentiometer1, 0, 1023, 0, 255);

  // read angle potentiometer
  int potentiometer2 = analogRead(A2);
  int pot2 = map(potentiometer2, 0, 1023, 0, 255);

  // print variables
  Serial.print(button);
  Serial.print(",");
  Serial.print(pot1);
  Serial.print(",");
  Serial.println(pot2);

  delay(1);

}
