/***************************************************
  This is an example sketch for our optical Fingerprint sensor

  Adafruit invests time and resources providing this open source code,
  please support Adafruit and open-source hardware by purchasing
  products from Adafruit!

  Written by Limor Fried/Ladyada for Adafruit Industries.
  BSD license, all text above must be included in any redistribution
 ****************************************************/


#include <Adafruit_Fingerprint.h>

#if (defined(__AVR__) || defined(ESP8266)) && !defined(__AVR_ATmega2560__)
// For UNO and others without hardware serial, we must use software serial...
// pin #2 is IN from sensor (GREEN wire)
// pin #3 is OUT from arduino  (WHITE wire)
// Set up the serial port to use softwareserial..
SoftwareSerial mySerial(2, 3);

#else
// On Leonardo/M0/etc, others with hardware serial, use hardware serial!
// #0 is green wire, #1 is white
#define mySerial Serial1

#endif


Adafruit_Fingerprint finger = Adafruit_Fingerprint(&mySerial);

int getFingerprintIDez();

int confirmLed = 13;
int processingLed = 12;
int errorLed = 11;

bool is_running = true;
bool is_processing = true;


void setup()
{

  pinMode(confirmLed,OUTPUT);
  digitalWrite(confirmLed,LOW);

  pinMode(processingLed,OUTPUT);
  digitalWrite(processingLed,LOW);

  pinMode(errorLed,OUTPUT);
  digitalWrite(errorLed,LOW);
  
  //while (!Serial);
  Serial.begin(9600);
 // Serial.println("Fingerprint template extractor");

  // set the data rate for the sensor serial port
  finger.begin(57600);

  if (finger.verifyPassword()) {
    Serial.println("READY");
  } else {
    Serial.println("NOT AVAILABLE");
    while (1);
  }

  // Try to get the templates for fingers 1 through 10
//        for (int finger = 1; finger < 2; finger++) {
//          downloadFingerprintTemplate(finger);
//        }

    
  Serial.println("WAITING");
}

void showConfirmation(){
  Serial.println("Confirmation");
  digitalWrite(processingLed,LOW);
  digitalWrite(errorLed,LOW);

  digitalWrite(confirmLed,HIGH);
  delay(200);
  digitalWrite(confirmLed,LOW);
  delay(200);
  digitalWrite(confirmLed,HIGH);
  delay(200);
  digitalWrite(confirmLed,LOW);
  delay(200);
}

void showProcessing(){
//  Serial.println("Processing");
  digitalWrite(processingLed,HIGH);
  digitalWrite(errorLed,LOW);
  digitalWrite(confirmLed,LOW);
}


void showError(){
//  Serial.println("Error");
  digitalWrite(processingLed, LOW);
  digitalWrite(errorLed, HIGH);
  digitalWrite(confirmLed, LOW);
}

uint8_t downloadFingerprintTemplate(uint16_t id)
{
 // Serial.println("------------------------------------");
 // Serial.print("Attempting to load #"); Serial.println(id);
  uint8_t p = finger.loadModel(id);
  switch (p) {
    case FINGERPRINT_OK:
     // Serial.print("Template "); Serial.print(id); Serial.println(" loaded");
      break;
    case FINGERPRINT_PACKETRECIEVEERR:
   //   Serial.println("Communication error");
      return p;
    default:
   //   Serial.print("Unknown error "); Serial.println(p);
      return p;
  }

  // OK success!

//  Serial.print("Attempting to get #"); Serial.println(id);
  p = finger.getModel();
  switch (p) {
    case FINGERPRINT_OK:
  //    Serial.print("Template "); Serial.print(id); Serial.println(" transferring:");
      break;
    default:
//      Serial.print("Unknown error "); Serial.println(p);
      return p;
  }

  // one data packet is 267 bytes. in one data packet, 11 bytes are 'usesless' :D
  uint8_t bytesReceived[534]; // 2 data packets
  memset(bytesReceived, 0xff, 534);

  uint32_t starttime = millis();
  int i = 0;
  while (i < 534 && (millis() - starttime) < 20000) {
    if (mySerial.available()) {
      bytesReceived[i++] = mySerial.read();
    }
  }
//  Serial.print(i); Serial.println(" bytes read.");
 // Serial.println("Decoding packet...");

  uint8_t fingerTemplate[512]; // the real template
  memset(fingerTemplate, 0xff, 512);

  // filtering only the data packets
  int uindx = 9, index = 0;
  memcpy(fingerTemplate + index, bytesReceived + uindx, 256);   // first 256 bytes
  uindx += 256;       // skip data
  uindx += 2;         // skip checksum
  uindx += 9;         // skip next header
  index += 256;       // advance pointer
  memcpy(fingerTemplate + index, bytesReceived + uindx, 256);   // second 256 bytes

  for (int i = 0; i < 512; ++i) {
    //Serial.print("0x");
    printHex(fingerTemplate[i], 2);
    //Serial.print(", ");
  }
  //Serial.println("\ndone.");

  return p;

  /*
    uint8_t templateBuffer[256];
    memset(templateBuffer, 0xff, 256);  //zero out template buffer
    int index=0;
    uint32_t starttime = millis();
    while ((index < 256) && ((millis() - starttime) < 1000))
    {
    if (mySerial.available())
    {
      templateBuffer[index] = mySerial.read();
      index++;
    }
    }

    Serial.print(index); Serial.println(" bytes read");

    //dump entire templateBuffer.  This prints out 16 lines of 16 bytes
    for (int count= 0; count < 16; count++)
    {
    for (int i = 0; i < 16; i++)
    {
      Serial.print("0x");
      Serial.print(templateBuffer[count*16+i], HEX);
      Serial.print(", ");
    }
    Serial.println();
    }*/
}

uint8_t getFingerprintEnroll() {
  uint8_t id = 1;
  int p = -1;
  //Serial.print("Waiting for valid finger to enroll as #"); Serial.println(id);
  while (p != FINGERPRINT_OK) {
    // LED should turn on - yellow
    p = finger.getImage();
    // LED should turn off - yellow
    
    switch (p) {
    case FINGERPRINT_OK:
//      Serial.println("Image taken");
      break;
    case FINGERPRINT_NOFINGER:
//      Serial.println(".");
      break;
    case FINGERPRINT_PACKETRECIEVEERR:
//      Serial.println("Communication error");
      break;
    case FINGERPRINT_IMAGEFAIL:
//      Serial.println("Imaging error");
      break;
    default:
//      Serial.println("Unknown error");
      break;
    }
  }

  // OK success!

  p = finger.image2Tz(1);
  switch (p) {
    case FINGERPRINT_OK:
//      Serial.println("Image converted");
      break;
    case FINGERPRINT_IMAGEMESS:
//      Serial.println("Image too messy");
      return p;
    case FINGERPRINT_PACKETRECIEVEERR:
//      Serial.println("Communication error");
      return p;
    case FINGERPRINT_FEATUREFAIL:
//      Serial.println("Could not find fingerprint features");
      return p;
    case FINGERPRINT_INVALIDIMAGE:
//      Serial.println("Could not find fingerprint features");
      return p;
    default:
//      Serial.println("Unknown error");
      return p;
  }

//  Serial.println("Remove finger");
// LED should turn on - yellow
  delay(2000);
// LED should turn off - yellow
  p = 0;
  while (p != FINGERPRINT_NOFINGER) {
    p = finger.getImage();
  }
//  Serial.print("ID "); Serial.println(id);
  p = -1;
//  Serial.println("Place same finger again");
  while (p != FINGERPRINT_OK) {
    p = finger.getImage();
    switch (p) {
    case FINGERPRINT_OK:
//      Serial.println("Image taken");
      break;
    case FINGERPRINT_NOFINGER:
//      Serial.print(".");
      break;
    case FINGERPRINT_PACKETRECIEVEERR:
//      Serial.println("Communication error");
      break;
    case FINGERPRINT_IMAGEFAIL:
//      Serial.println("Imaging error");
      break;
    default:
//      Serial.println("Unknown error");
      break;
    }
  }

  // OK success!

  p = finger.image2Tz(2);
  switch (p) {
    case FINGERPRINT_OK:
//      Serial.println("Image converted");
      break;
    case FINGERPRINT_IMAGEMESS:
//      Serial.println("Image too messy");
      return 55;
//      return p;
    case FINGERPRINT_PACKETRECIEVEERR:
//      Serial.println("Communication error");
      return 55;
//      return p;
    case FINGERPRINT_FEATUREFAIL:
//      Serial.println("Could not find fingerprint features");
      return 55;
//      return p;
    case FINGERPRINT_INVALIDIMAGE:
//      Serial.println("Could not find fingerprint features");
      return 55;
//      return p;
    default:
//      Serial.println("Unknown error");
      return 55;
//      return p;
  }

  // OK converted!
//  Serial.print("Creating model for #");  Serial.println(id);


  p = finger.createModel();
  if (p == FINGERPRINT_OK) {
    Serial.println("Prints matched!");
  } else if (p == FINGERPRINT_PACKETRECIEVEERR) {
    //Serial.println("Communication error");
//    return p;
    return 55;
  } else if (p == FINGERPRINT_ENROLLMISMATCH) {
    Serial.println("Fingerprints did not match");
    return 55;
//    return p;
  } else {
    //Serial.println("Unknown error");
    return 55;
//    return p;
  }


//  Serial.print("ID "); Serial.println(id);
  p = finger.storeModel(id);
  if (p == FINGERPRINT_OK) {
//    Serial.println("Stored!");
    return 10;
  } else if (p == FINGERPRINT_PACKETRECIEVEERR) {
    return 55;
//    Serial.println("Communication error");
    //return p;
  } else if (p == FINGERPRINT_BADLOCATION) {
//    Serial.println("Could not store in that location");
      return 55;
    //return p;
  } else if (p == FINGERPRINT_FLASHERR) {
//    Serial.println("Error writing to flash");
    return 55;
    //return p;
  } else {
//    Serial.println("Unknown error");
      return 55;
//    return p;
  }

  return true;
}


void printHex(int num, int precision) {
  char tmp[16];
  char format[128];

  sprintf(format, "%%.%dX", precision);

  sprintf(tmp, format, num);
  Serial.print(tmp);
}

void loop()
{


//  String tst = "ENROLL 23";
//  if (!(tst.indexOf("ENROLL") == -1)){
//    int wsi = tst.indexOf(' ');
//    String tsk = tst.substring(0,wsi);
//    int val = tst.substring(wsi).toInt();
//    
//  }
  
  
  
  //Serial.println(getMatchedID());
  //enrollNewFingerprint(1);

  
  if(Serial.available() >= 1){
      String cmd = Serial.readStringUntil('\n');
      if(cmd.equals(String("START"))){
        
        
        is_running = true;
        while(is_running){
            // Enroll temporary fingerprint
        //int fstatus = 55;
        //while(fstatus == 55){
         //  fstatus = getFingerprintEnroll();  
         //}      
        
         // Try to get the templates for fingers 1 through 10
         // downloadFingerprintTemplate(1);
         // Serial.println();
          is_processing = true;
          
          while(true){
            if(is_processing || Serial.available() >= 1){
                cmd = Serial.readStringUntil('\n');
                if(cmd.equals(String("CONFIRM"))){
                  is_processing = false;
                    showConfirmation();
                    break;
                }else if(cmd.equals(String("PROCESSING"))){
                    is_processing = true;
                    showProcessing();
                }else if (!(cmd.indexOf("ENROLL") == -1)){
                      int wsi = cmd.indexOf(' ');
                      String tsk = cmd.substring(0,wsi);
                      int enroll_id = cmd.substring(wsi).toInt(); 
                      enrollNewFingerprint(enroll_id); 
               }else if(cmd.equals(String("ERROR"))){
                    is_processing = false;
                    showError();
                    break;
                }else if(cmd.equals(String("ATTENDANCE"))){
                    while(true){
                    int tmp = getMatchedID();
                    while(tmp == 250 || tmp == 0){
                      showProcessing();
                      tmp = getMatchedID();
                     }
                    Serial.println(tmp);
                    showConfirmation();
                    if(Serial.available() >= 1){
                      cmd = Serial.readStringUntil('\n');
                      if(cmd.equals(String("END"))){
                        Serial.println("ENDING");
                        break;
                        }
                      }
                      }
                }else if(cmd.equals(String("MATCH"))){
                    is_processing = false;
                    int tmp = getMatchedID();
                    while(tmp == 250 || tmp == 0){
                      tmp = getMatchedID();
                      }
                    Serial.println(tmp);
                    showConfirmation();
                    break;
                }else if(cmd.equals(String("END"))){
                    is_processing = false;
                    is_running = false;
                    break;
                }else {}
            }   
          }
          
          
       }

       
          }
//          Serial.println("WAITING");
        
    }
}  



uint8_t getMatchedID() {
  uint8_t p = finger.getImage();
  switch (p) {
    case FINGERPRINT_OK:
      //Serial.println("Image taken");
      break;
    case FINGERPRINT_NOFINGER:
      //Serial.println("No finger detected");
      showError();
      return 250;
    case FINGERPRINT_PACKETRECIEVEERR:
      //Serial.println("Communication error");
      showError();
      return 250;
    case FINGERPRINT_IMAGEFAIL:
      //Serial.println("Imaging error");
      showError();
      return 250;
    default:
    showError();
      //Serial.println("Unknown error");
      return 250;
  }

  // OK success!

  p = finger.image2Tz();
  switch (p) {
    case FINGERPRINT_OK:
      //Serial.println("Image converted");
      break;
    case FINGERPRINT_IMAGEMESS:
      //Serial.println("Image too messy");
      showError();
      return 250;
    case FINGERPRINT_PACKETRECIEVEERR:
       showError();
      //Serial.println("Communication error");
      return 250;
    case FINGERPRINT_FEATUREFAIL:
      showError();
      //Serial.println("Could not find fingerprint features");
      return 250;
    case FINGERPRINT_INVALIDIMAGE:
      showError();
      //Serial.println("Could not find fingerprint features");
      return 250;
    default:
      showError();
      //Serial.println("Unknown error");
      return 250;
  }

  // OK converted!
  p = finger.fingerSearch();
  if (p == FINGERPRINT_OK) {
    //Serial.println("Found a print match!");
  } else if (p == FINGERPRINT_PACKETRECIEVEERR) {
    showError();
    //Serial.println("Communication error");
    return 250;
  } else if (p == FINGERPRINT_NOTFOUND) {
    showError();
    Serial.println("NO MATCH");
    return 250;
  } else {
    showError();
    Serial.println("ERROR");
    return 250;
  }

  // found a match!
  //Serial.print("Found ID #"); Serial.print(finger.fingerID);
  //Serial.print(" with confidence of "); Serial.println(finger.confidence);

  return finger.fingerID;
}

// returns -1 if failed, otherwise returns ID #
int getFingerprintIDez() {
  uint8_t p = finger.getImage();
  if (p != FINGERPRINT_OK)  return -1;

  p = finger.image2Tz();
  if (p != FINGERPRINT_OK)  return -1;

  p = finger.fingerFastSearch();
  if (p != FINGERPRINT_OK)  return -1;

  // found a match!
  //Serial.print("Found ID #"); Serial.print(finger.fingerID);
  //Serial.print(" with confidence of "); Serial.println(finger.confidence);
  return finger.fingerID;
}


uint8_t enrollNewFingerprint(int id) {

  int p = -1;
  //Serial.print("Waiting for valid finger to enroll as #"); Serial.println(id);
  while (p != FINGERPRINT_OK) {
    p = finger.getImage();
    switch (p) {
    case FINGERPRINT_OK:
      //Serial.println("Image taken");
      showError();
      break;
    case FINGERPRINT_NOFINGER:
//      Serial.println(".");
        showError();
      break;
    case FINGERPRINT_PACKETRECIEVEERR:
//      Serial.println("Communication error");
        showError();
      break;
    case FINGERPRINT_IMAGEFAIL:
//      Serial.println("Imaging error");
        showError();
      break;
    default:
      showError();
//      Serial.println("Unknown error");
      break;
    }
  }

  // OK success!

  p = finger.image2Tz(1);
  switch (p) {
    case FINGERPRINT_OK:
//      Serial.println("Image converted");
      break;
    case FINGERPRINT_IMAGEMESS:
        showError();
//      Serial.println("Image too messy");
      return p;
    case FINGERPRINT_PACKETRECIEVEERR:
        showError();
//      Serial.println("Communication error");
      return p;
    case FINGERPRINT_FEATUREFAIL:
    showError();
//      Serial.println("Could not find fingerprint features");
      return p;
    case FINGERPRINT_INVALIDIMAGE:
    showError();
//      Serial.println("Could not find fingerprint features");
      return p;
    default:
    showError();
//      Serial.println("Unknown error");
      return p;
  }

//  Serial.println("Remove finger");
  delay(2000);
  p = 0;
  while (p != FINGERPRINT_NOFINGER) {
    p = finger.getImage();
  }
  //Serial.print("ID "); Serial.println(id);
  p = -1;
  //Serial.println("Place same finger again");
  while (p != FINGERPRINT_OK) {
    p = finger.getImage();
    switch (p) {
    case FINGERPRINT_OK:
      //Serial.println("Image taken");
      break;
    case FINGERPRINT_NOFINGER:
    showError();
      //Serial.print(".");
      break;
    case FINGERPRINT_PACKETRECIEVEERR:
    showError();
      //Serial.println("Communication error");
      break;
    case FINGERPRINT_IMAGEFAIL:
    showError();
      //Serial.println("Imaging error");
      break;
    default:
    showError();
      //Serial.println("Unknown error");
      break;
    }
  }

  // OK success!

  p = finger.image2Tz(2);
  switch (p) {
    case FINGERPRINT_OK:
      //Serial.println("Image converted");
      break;
    case FINGERPRINT_IMAGEMESS:
    showError();
      //Serial.println("Image too messy");
      return p;
    case FINGERPRINT_PACKETRECIEVEERR:
    showError();
      //Serial.println("Communication error");
      return p;
    case FINGERPRINT_FEATUREFAIL:
    showError();
      //Serial.println("Could not find fingerprint features");
      return p;
    case FINGERPRINT_INVALIDIMAGE:
    showError();
      //Serial.println("Could not find fingerprint features");
      return p;
    default:
    showError();
      //Serial.println("Unknown error");
      return p;
  }

  // OK converted!
  //Serial.print("Creating model for #");  Serial.println(id);

  p = finger.createModel();
  if (p == FINGERPRINT_OK) {
    //Serial.println("Prints matched!");
  } else if (p == FINGERPRINT_PACKETRECIEVEERR) {
    Serial.println(250);
    showError();
//    Serial.println("Communication error");
    return p;
  } else if (p == FINGERPRINT_ENROLLMISMATCH) {
    Serial.println(250);
    showError();
//    Serial.println("Fingerprints did not match");
    return p;
  } else {
    Serial.println(250);
    showError();
//    Serial.println("Unknown error");
    return p;
  }

//  Serial.print("ID "); Serial.println(id);
  p = finger.storeModel(id);
  if (p == FINGERPRINT_OK) {
    Serial.println("ENROLLED");
  } else if (p == FINGERPRINT_PACKETRECIEVEERR) {
    Serial.println(250);
    showError();
//    Serial.println("Communication error");
    return p;
  } else if (p == FINGERPRINT_BADLOCATION) {
    Serial.println(250);
    showError();
//    Serial.println("Could not store in that location");
    return p;
  } else if (p == FINGERPRINT_FLASHERR) {
    Serial.println(250);
    showError();
//    Serial.println("Error writing to flash");
    return p;
  } else {
    Serial.println(250);
    showError();
//    Serial.println("Unknown error");
    return p;
  }

  return true;
}
