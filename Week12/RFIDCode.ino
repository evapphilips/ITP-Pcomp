// include libraries
#include <SPI.h>
#include <MFRC522.h>

// define pins
# define RST_PIN 9
#define SS_1_PIN 10 // Configurable, take a unused pin, only HIGH/LOW required, must be diffrent to SS 2
#define SS_2_PIN 8  // Configurable, take a unused pin, only HIGH/LOW required, must be diffrent to SS 1
#define NR_OF_READERS 2 // ** change to 2 when I add the toher reader and uncomment SS_2 **

// setup MFRC522 instance
byte ssPins[] = {SS_1_PIN,SS_2_PIN}; // ** when 2 readers change to = {SS_1_PIN, SS_2_PIN} **
MFRC522 mfrc522[NR_OF_READERS]; // Create MFRC522 instance

// button variables
const int clearButtonPin = 2;
const int submitButtonPin = 3; 
int clearButtonState = 0;
int submitButtonState = 0;

void setup() {
  // begin communications
  Serial.begin(9600); // Initialize serial communications with the PC
  while(!Serial); // Do nothing if no serial port is opened (added for Arduinos based on ATMEGA32U4)
  SPI.begin();  // initiate SPI bus

  // setup response (serial prints the connected readers & versions)
  for (uint8_t reader = 0; reader < NR_OF_READERS; reader++) {
    mfrc522[reader].PCD_Init(ssPins[reader], RST_PIN); // Init each MFRC522 card
    Serial.print(F("Reader "));
    Serial.print(reader);
    Serial.print(F(": "));
    mfrc522[reader].PCD_DumpVersionToSerial();
  }

  // button setup
  pinMode(clearButtonPin, INPUT);
  pinMode(submitButtonPin, INPUT);
}

void loop() {
  // reader output
  for (uint8_t reader = 0; reader < NR_OF_READERS; reader++) {
    // Look for new cards
    if (mfrc522[reader].PICC_IsNewCardPresent() && mfrc522[reader].PICC_ReadCardSerial()) {
      //Serial.print(F("Reader "));
      Serial.print(reader);
      // Show some details of the PICC (that is: the tag/card)
      //Serial.print(F(": Card UID:"));
      dump_byte_array(mfrc522[reader].uid.uidByte, mfrc522[reader].uid.size);
      Serial.print("0"); // clear
      Serial.print("0"); // submit
      Serial.println();
      //Serial.print(F("PICC type: "));
      //MFRC522::PICC_Type piccType = mfrc522[reader].PICC_GetType(mfrc522[reader].uid.sak);
      //Serial.println(mfrc522[reader].PICC_GetTypeName(piccType));

      // Halt PICC
      mfrc522[reader].PICC_HaltA();
      // Stop encryption on PCD
      mfrc522[reader].PCD_StopCrypto1();
    } //if (mfrc522[reader].PICC_IsNewC
  } //for(uint8_t reader

  // button output
      clearButtonState = digitalRead(clearButtonPin); // read the button
      submitButtonState = digitalRead(submitButtonPin);

      if(clearButtonState == HIGH){ // set buttons to true if pressed
        Serial.println("0010");
      }
      if(submitButtonState == HIGH){ // set buttons to true if pressed
        Serial.println("0001");
      }
}

byte dump_byte_array(byte *buffer, byte bufferSize) {
  String myString = "";
  for (byte i = 0; i < bufferSize; i++) {
//    Serial.print(buffer[i] < 0x10 ? " 0" : " ");
//    Serial.print(buffer[i], DEC);
myString = myString + buffer[i];
  }
  //Serial.print(myString);

  if(myString == "8720921438"){
    Serial.print('A');
  }else if(myString == "167205539"){
    Serial.print('B');
  }else if(myString == "1031156139"){
    Serial.print('C');
  }else if(myString == "23111816538"){
    Serial.print('D');
  }else if(myString == "79818038"){
    Serial.print('E');
  }else if(myString == "1032010338"){
    Serial.print('F');
  }else if(myString == "231713438"){
    Serial.print('G');
  }else if(myString == "1837812738"){
    Serial.print('H');
  }else if(myString == "392518238"){
    Serial.print('I');
  }else if(myString == "23116719438"){
    Serial.print('J');
  }else if(myString == "13514018438"){
    Serial.print('K');
  }else if(myString == "1035819838"){
    Serial.print('L');
  }else if(myString == "7114018438"){
    Serial.print('M');
  }else if(myString == "24710413238"){
    Serial.print('N');
  }else if(myString == "18319019538"){
    Serial.print('O');
  }else if(myString == "1037117938"){
    Serial.print('P');
  }else if(myString == "1831419738"){
    Serial.print('Q');
  }else if(myString == "1999212638"){
    Serial.print('R');
  }else if(myString == "23112215838"){
    Serial.print('S');
  }else if(myString == "1032157239"){
    Serial.print('T');
  }else if(myString == "2319218638"){
    Serial.print('U');
    }else if(myString == "2477711138"){
    Serial.print('V');
    }
}
