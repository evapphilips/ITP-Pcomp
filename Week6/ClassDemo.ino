void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);

}

void loop() {
  // put your main code here, to run repeatedly:
  int reading1 = analogRead(A0);
  int reading2 = analogRead(A1);
  int mapping1 = map(reading1, 0, 1023, 0, 255);
  int mapping2 = map(reading2, 0, 1023, 0, 255);
  delay(20);
  Serial.print(mapping1);
  Serial.print(",");
  Serial.println(mapping2);

}
