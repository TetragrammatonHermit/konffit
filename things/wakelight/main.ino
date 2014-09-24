int led = D0;

void setup() {
  // Register API function that is called over HTTP
  Spark.function("wakeme", wakeme);
  Spark.function("toggle", toggle);
  Spark.function("off", off);
  pinMode(led, OUTPUT);
  digitalWrite(led, LOW);
}

void loop(){
  // Empty because we wait for requests
}

int toggle(String args){
  analogWrite(led, 255);
  delay(5000);
  analogWrite(led, 0);
  return 1;
  
}

int off(String args){
  digitalWrite(led, LOW);
  return 1;
  
}

int wakeme(String stepDelay){
    // todo this runs somehow in background when calling other functions
    // terminate it before running other stuff..
  int ledval;
  
  for ( ledval = 1; ledval < 255; ledval++ ){
    analogWrite(led, ledval);
    delay(stepDelay.toInt());
  }

  // TODO: blink very annoyingly for wakeup
  return 1;
}
