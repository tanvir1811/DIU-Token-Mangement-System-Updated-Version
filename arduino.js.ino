#include <Wire.h>
#include <LiquidCrystal_I2C.h>


const int trig1 = 2;
const int echo1 = 3;
const int trig2 = 4;
const int echo2 = 5;


LiquidCrystal_I2C lcd(0x27, 16, 2);

int peopleCount = 0;
int maxPeople = 5;



  unsigned long check1 = 0;
    unsigned long check2 = 0;
unsigned long blockpeople = 0;
  unsigned long tStart=0;
    unsigned long tStart2=0;
  double time1=0;
   double time2=0;
     unsigned long timecheck1=0;
      unsigned long timecheck2=0;
      String msg="";


long getDistance(int trig, int echo) {
  digitalWrite(trig, LOW);
  delayMicroseconds(2);
  digitalWrite(trig, HIGH);
  delayMicroseconds(10);
  digitalWrite(trig, LOW);
  return pulseIn(echo, HIGH) * 0.034 / 2;
}

void setup() {
  pinMode(trig1, OUTPUT);
  pinMode(echo1, INPUT);
  pinMode(trig2, OUTPUT);
  pinMode(echo2, INPUT);

  lcd.init();         // Initialize the I2C LCD
  lcd.backlight();    // Turn on the LCD backlight
  Serial.begin(9600);

  lcd.setCursor(0, 0);
  lcd.print("System Ready");
  delay(2000);
  lcd.clear();
}

void loop() {
  long d1 = getDistance(trig1, echo1);
  long d2 = getDistance(trig2, echo2);
if (Serial.available()) {
    String msg1 = Serial.readStringUntil('\n');

    int comma1 = msg1.indexOf(',');

   
    int val1 = msg1.substring(0, comma1).toInt();
         msg = msg1.substring(comma1 + 1); 

    
 

    maxPeople = val1;  
}
  
// maxPeople=3;

  if (d1 <9 && check1==0 &&blockpeople==0) {
        time1= millis()-tStart2;
        tStart2=millis();
       
      
   peopleCount++;
   Serial.println("Count:"+String(peopleCount));

   check1=1;
 
      }

 else if(check1==1){
 
  if(d1>9&&(millis()-tStart2)<2000){
    
    check1=0;
    }

    else if(d1<9&&(millis()-tStart2)>2000){
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("Don't block coming door");
      lcd.setCursor(0, 1);
      lcd.print("Move please!");
   
      delay(2000);
      d1 = getDistance(trig1, echo1);
      if(d1>9){
        check1=0;
      }
    }

  
    
  }
 

 else if (d2 <9 && check2==0) {
    time2= millis()-tStart;
    tStart=millis();
    
    
   

 if (peopleCount > 0) peopleCount--;
 check2=1;
        
      
    }
 else if(check2==1){
  if(d2>9&&(millis()-tStart)<2000){
    
    check2=0;
    }

    else if(d2<9&&(millis()-tStart)>2000){
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("Don't block Going Door");
      lcd.setCursor(0, 1);
      lcd.print("Move please!");
   
      delay(2000);
      d2 = getDistance(trig2, echo2);
      if(d2>9){
        check2=0;
      }
    }
  }
 
    
  
 
  
 
  

  lcd.clear();
  if (peopleCount >= maxPeople) {
    lcd.setCursor(0, 0);
    lcd.print("DO Not Enter");
    blockpeople=1;
    
  } else {
    lcd.setCursor(0, 0);
    lcd.print(msg);
    lcd.setCursor(0, 1);
    lcd.print("Get In");
    blockpeople = 0;
  }

     lcd.setCursor(7, 1);

 
 // lcd.print(peopleCount);

 double difference=time1-time2;
 Serial.println("Time:"+String(difference));




  delay(100);
}
