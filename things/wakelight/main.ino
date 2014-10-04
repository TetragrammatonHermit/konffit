// Connected to transistor base
int ledPin = D0;


void setup() {
  // Register API function that is called over HTTP
  Spark.function("off", led_off);
  Spark.function("on", led_on);
  Spark.function("brightening", led_brightening);
  Spark.function("strobo", led_strobo);
  pinMode(ledPin, OUTPUT);
}

// 0:off
// 1:on
// 2:brightening
// 3:strobo
int ledStatus = 0;

int ledVal = 5;

void loop(){
  switch (ledStatus) {
  case 0:
    ledVal = 0;
    break;
  case 1:
    ledVal = 255;
    break;
  case 2:
    if (ledVal < 255){
      ledVal++;
    }
    delay(15000);  // Takes around 1h to 100%
    break;
  case 3:
    if (ledVal > 0){
      ledVal = 0;
    } else {
      ledVal = 255;
    }
    delay(50);
    break;
  default:
    ledVal = 5;
  }
  delay(5);
  analogWrite(ledPin, ledVal);
}

int led_off(String args){
  ledStatus = 0;
  return ledStatus;
}

// TODO Args string passed cause Spark requires it?
int led_on(String args){
  ledStatus = 1;
  return ledStatus;
}

int led_brightening(String args){
  ledStatus = 2;

  return ledStatus;
}

int led_strobo(String args){
  ledStatus = 3;

  return ledStatus;
}
